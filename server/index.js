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

massive({
    connectionString: `${process.env.DB_CONNECTION_STRING}`,
    ssl: { rejectUnauthorized: false },
}).then((dbInstance) => {
    app.set("db", dbInstance);
});


app.use(express.json());
app.use(cors());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: `${process.env.SESSION_SECRET}`,
        cookie: { maxAge: 60000 },
    })
);

const hashedPasswords = [];

async function hashDbPasswords(userId) {
    const db = await app.get("db");
    console.log(db);
    // let password = db.get_passwords(userId)
    // console.log(password);
    // let salt = bcrypt.genSaltSync(15);
    // users[index].password = bcrypt.hashSync(currentPassword, salt);
}

hashDbPasswords(1)

const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;

    //TODO Make request to DB
    let foundUser = users.find((value) => value.username === username);
    if (!foundUser) {
        res.status(404).send("Username does not exist");
        return;
    } else {
        let hashedPassword = foundUser.password;
        let authenticated = bcrypt.compareSync(password, hashedPassword);
        if (authenticated === true) {
            req.session.user = foundUser;
            res.status(200).send(foundUser);
            return;
        } else {
            res.status(403).send("Invalid username or password");
            return;
        }
    }
};

//* Authenticates a user
app.post("/api/login", authenticateUser, (req, res) => {});

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

//* Creates a new board using provided info
app.post("/boards");

//* Retrieves the specified board’s information to display in the dashboard
app.get("/boards/:id");

//* Updates a board’s capture mode & associated platform queries
app.put("/boards/:id");

//*  Deletes the specified board
app.delete("/boards/:id");

app.get("/", (req, res) => {
    res.send("Hello world");
});

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
