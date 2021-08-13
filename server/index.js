require("dotenv").config({ path: __dirname + `/../.env` });
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const users = require("../data/sampleUsers.json");
const loginController = require("./controllers/LoginController");
const twitter = require("./controllers/Twitter");
const massive = require("massive");
const app = express();
const PORT = process.env.PORT || 8000;
const saltRounds = 15;
const tenSecs = 1000 * 60 * 10;

//* Massive
(async () => {
    let db = await massive({
        connectionString: `${process.env.DB_CONNECTION_STRING}`,
        ssl: { rejectUnauthorized: false },
    });
    app.set("db", db);
})();

//* Middleware
app.use(express.json());
app.use(cors());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: `${process.env.SESSION_SECRET}`,
        cookie: { maxAge: tenSecs },
    })
);

//* Hashes passwords already in DB (for testing)
const hashDbPasswords = async (req, res) => {
    let userId = req.params.id;
    const dbInstance = await req.app.get("db");
    dbInstance.get_passwords(userId).then((passwords) => {
        let currentPassword = "HSBg2nwJ6n9";
        bcrypt.hash(currentPassword, saltRounds, function (err, hash) {
            dbInstance.update_password(hash, userId).then(() => {
                res.status(200).send("Success!");
            });
        });
    });
};

const authenticateUser = async (req, res, next) => {
    const { username, password } = req.body;
    const dbInstance = await req.app.get("db");
    //TODO Make request to DB
    let foundUser = await dbInstance.users.find({
        username: username.toLowerCase(),
    });
    console.log(foundUser.length);
    if (foundUser.length > 0) {
        let hash = foundUser[0].password;
        bcrypt.compare(password, hash, function (err, authenticated) {
            if (authenticated === true) {
                req.session.user = foundUser[0];
                next();
            } else {
                res.status(403).send("Invalid username or password");
                return;
            }
        });
    }
};

//* Sample Endpoint
app.get("/passwords/:id", hashDbPasswords);

//* Authenticates a user
app.post("/api/login", authenticateUser, async (req, res) => {
    if (req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(400).send('Test')
    }
    
});

//* Creates a user account
app.post(
    "/api/login/create",
    loginController.checkExistingUsers,
    (req, res) => {
        res.status(200).send(`Account sucessfully created!`);
    }
);

//* Retrieves a user's account info & boards
app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    let foundUser = users.find((value) => value.user_id === id);
    console.log(foundUser);
    //TODO Make request to DB
    res.status(200).send(foundUser);
});

//* Updates a user's password
app.put("/account");

//* Logs out a user
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

//* Creates a new board using provided info
app.post("/boards");

//* Retrieves the specified board’s information to display in the dashboard
app.get("/boards/:id");

//* Updates a board’s capture mode & associated platform queries
app.put("/boards/:id");

//* Deletes the specified board
app.delete("/boards/:id");

app.get("/api/social/twitter/:term", async (req, res) => {
    let { term } = req.params;
    let searchType = req.query.type;
    if (searchType === "hashtag") {
        let searchResults = await twitter.searchHashtag(term);
        res.status(200).send(searchResults);
    } else {
        // let searchResults = await twitter.searchHashtag(term)
        // res.status(200).send(searchResults)
    }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
