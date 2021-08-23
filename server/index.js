require('dotenv').config({ path: __dirname + `/../.env` });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const twitter = require('./controllers/Twitter');
const massive = require('massive');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 8000;
const secret = `${process.env.SESSION_SECRET}`;
const saltRounds = 15;

//* AWS
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    region: 'us-west-1',
});

//* Massive
(async () => {
    let db = await massive({
        connectionString: `${process.env.DB_CONNECTION_STRING}`,
        ssl: { rejectUnauthorized: false },
    });
    app.set('db', db);
})();

//* Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: secret,
        cookie: { maxAge: 600000 },
    })
);

//* Verifies user before running logic in endpoints (back-end)
function requireLogin(req, res, next) {
    if (req.session.user === undefined) {
        res.sendStatus(403);
    } else {
        next();
    }
}

//* Makes sure a user has a valid session before sending the correct route (front-end)
app.get('/api/verify', requireLogin, (req, res) => {
    res.sendStatus(200);
});

//* Login a user
app.post('/api/authenticate', async (req, res) => {
    const { username, password } = req.body;
    if (username === '' && password === '') {
        res.sendStatus(406);
    } else {
        const dbInstance = await req.app.get('db');
        let foundUser = await dbInstance.users.find({
            username: username.toLowerCase(),
        });
        if (foundUser.length > 0) {
            let hash = foundUser[0].password;
            bcrypt.compare(password, hash, function (err, authenticated) {
                if (authenticated === true) {
                    dbInstance.session_new(foundUser[0]['user_id']).then(() => {
                        req.session.user = foundUser[0];
                        res.sendStatus(200);
                    });
                } else {
                    res.sendStatus(403);
                }
            });
        } else {
            res.sendStatus(404);
        }
    }
});

//* Creates a user account
app.post('/api/login/create', async (req, res) => {
    const dbInstance = await req.app.get('db');
    let newUser = { ...req.body };
    newUser.username = newUser.username.toLowerCase();
    let { email, firstName, lastName, username, password } = newUser;

    dbInstance.users
        .count({
            username: username,
        })
        .then((total) => {
            if (total > 0) {
                res.status(409).send(`Username already taken!`);
            } else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    dbInstance
                        .user_create_account(
                            email,
                            firstName,
                            lastName,
                            username,
                            hash
                        )
                        .then(() => {
                            res.sendStatus(200);
                        });
                });
            }
        });
});

//* Retrieves a user's account info & boards
app.get('/api/user/', async (req, res) => {
    const dbInstance = await req.app.get('db');
    const id = req.session.user['user_id'];
    let allUserData = {
        user: {},
        boards: [],
    };

    dbInstance.user_get(id).then((user) => {
        Object.assign(allUserData.user, user[0]);
        dbInstance.boards_get(allUserData.user.user_id).then((boards) => {
            let len = boards.length;
            for (let i = 0; i < len; i++) {
                let query = {
                    query_id: boards[i].query_id,
                    platform_id: boards[i].platform_id,
                    query_text: boards[i].query_text,
                    capture_mode: boards[i].capture_mode,
                };

                if (
                    allUserData.boards.find(
                        (ele) => ele.board_id === boards[i].board_id
                    ) !== undefined
                ) {
                    let index = allUserData.boards.findIndex(
                        (ele) => ele.board_id === boards[i].board_id
                    );
                    allUserData.boards[index].queries.push(query);
                } else {
                    let newBoard = {
                        board_id: boards[i].board_id,
                        board_name: boards[i].board_name,
                        creation_date: boards[i].creation_date,
                        queries: [query],
                    };
                    allUserData.boards.push(newBoard);
                }
            }
            res.status(200).send(allUserData);
        });
    });
});

//* Retrieves a user's history of sessions
app.get('/api/sessions/', requireLogin, async (req, res) => {
    const dbInstance = await req.app.get('db');
    const id = req.session.user['user_id'];
    dbInstance.session_get(id).then((sessions) => {
        res.status(200).send(sessions);
    });
});

//* Updates a user's password
app.put('/account', requireLogin, (req, res) => {});

//* Logs out a user
app.get('/logout', requireLogin, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.redirect('/');
        }
    });
});

//* Upload new user avatar
app.post(
    '/api/images/user/:id',
    requireLogin,
    multer().single('image'),
    async (req, res) => {
        const userId = req.params.id;
        let s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        let file = req.file;
        var params = {
            Bucket: 'biggidea',
            Body: file.buffer,
            Key: `avatars/${file.originalname}`,
        };

        s3.upload(params, async (err, data) => {
            //handle error
            if (err) {
                console.log('Error', err);
                res.sendStatus(409);
            }
            //success
            if (data) {
                let newUrl = data.Location;
                const dbInstance = await req.app.get('db');
                dbInstance
                    .user_change_avatar(userId, newUrl)
                    .then((response) => {
                        res.sendStatus(200);
                    });
            }
        });
    }
);

//* Creates a new board using provided info
app.post('/boards', requireLogin);

//* Updates a board’s capture mode & associated platform queries
app.put('/boards/:id', requireLogin);

//* Deletes the specified board
app.delete('/boards/:id', requireLogin);

//* Searches Twitter
app.get('/api/social/twitter/:term', async (req, res) => {
    let { term } = req.params;
    let searchType = req.query.type;
    if (searchType === 'hashtag') {
        let searchResults = await twitter.searchHashtag(term);
        res.status(200).send(searchResults);
    } else {
        // let searchResults = await twitter.searchHashtag(term)
        // res.status(200).send(searchResults)
    }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
