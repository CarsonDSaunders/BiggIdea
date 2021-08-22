require('dotenv').config({ path: __dirname + `/../.env` });
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const users = require('../data/sampleUsers.json');
const twitter = require('./controllers/Twitter');
const massive = require('massive');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8000;
const secret = `${process.env.SESSION_SECRET}`;
const saltRounds = 15;
const tenSecs = 1000 * 60 * 10;

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
app.use(cors());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: secret,
        cookie: { maxAge: 600000 },
    })
);
app.use(cookieParser());

function requireLogin(req, res, next) {
    if (req.session.user === undefined) {
        res.sendStatus(403);
    } else {
        next();
    }
}

app.get('/api/verify', requireLogin, (req, res) => {
    res.sendStatus(200);
});

//* Hashes passwords already in DB (for testing)
const hashDbPasswords = async (req, res) => {
    let userId = req.params.id;
    const dbInstance = await req.app.get('db');
    dbInstance.get_passwords(userId).then((passwords) => {
        let currentPassword = 'HSBg2nwJ6n9';
        bcrypt.hash(currentPassword, saltRounds, function (err, hash) {
            dbInstance.update_password(hash, userId).then(() => {
                res.status(200).send('Success!');
            });
        });
    });
};

const authenticateUser = async (req, res, next) => {
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
                    req.session.user = foundUser[0];
                    res.sendStatus(200);
                } else {
                    res.sendStatus(403);
                }
            });
        } else {
            res.sendStatus(404);
        }
    }
};

//* Sample Endpoint
app.get('/passwords/:id', hashDbPasswords);

//* Login a user
app.post('/api/authenticate', authenticateUser);

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
                        .create_account(
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

    dbInstance.get_user(id).then((user) => {
        Object.assign(allUserData.user, user[0]);
        dbInstance.get_boards(allUserData.user.user_id).then((boards) => {
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

//* Creates a new board using provided info
app.post('/boards', requireLogin);

//* Updates a board’s capture mode & associated platform queries
app.put('/boards/:id', requireLogin);

//* Deletes the specified board
app.delete('/boards/:id', requireLogin);

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
