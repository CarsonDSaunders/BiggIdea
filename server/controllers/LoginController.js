const users = require("../../data/sampleUsers.json");

module.exports = {
    checkExistingUsers: (req, res, next) => {
        let newUser = { ...req.body };
        newUser.username = newUser.username.toLowerCase();
        console.log(newUser.username)
        let usernameExists = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === newUser.username) {
                usernameExists = true;
                break;
            } 
        }
        if (usernameExists === true) {
          res.status(409).send(`Username already taken!`);
        } else {
          users.push(newUser);
          next();
        }
      }
};
