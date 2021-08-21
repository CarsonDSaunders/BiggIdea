require("dotenv").config({ path: __dirname + `/../.env` });
const jwt = require("jsonwebtoken");
const secret = `${process.env.SESSION_SECRET}`;

const withAuth = function (req, res, next) {
    if (req.session) {
        const userToken = req.cookies.token;
        if (!userToken) {
            res.status(401).send("Unauthorized: No token provided");
        } else {
            jwt.verify(userToken, secret, function (err, decoded) {
                if (err) {
                    res.status(401).send("Unauthorized: Invalid token");
                } else {
                    req.username = decoded.username;
                    next();
                }
            });
        }
    } else {
      res.redirect('/');
    }
};
module.exports = withAuth;
