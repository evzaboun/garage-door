const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = function (req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body));

  low(adapter).then((lowdb) => {
    let userExists = lowdb
      .get("users")
      .has(`${base64encode(user.email)}`)
      .value();

    if (!userExists) {
      return res.status(400).send("Invalid username or password!");
    }

    low(adapter).then((lowdb) => {
      let hash = lowdb
        .get(`users.${base64encode(user.email)}.password`)
        .value();

      bcrypt.compare(user.password, hash).then((isPasswordValid) => {
        if (!isPasswordValid) {
          return res.status(400).send("Invalid username or password!");
        }

        const userEntry = lowdb
          .get(`users.${base64encode(user.email)}`)
          .value();

        const payload = {
          email: userEntry.email,
          isAdmin: userEntry.isAdmin,
          isVerified: userEntry.isVerified,
        };

        const token = jwt.sign(payload, process.env.JWT_KEY);
        res.send(token);
      });
    });
  });
};

const base64encode = (str) => {
  return Buffer.from(str).toString("base64");
};
