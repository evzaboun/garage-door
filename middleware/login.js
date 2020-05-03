const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();

module.exports = (req, res, next) => {
  low(adapter).then((lowdb) => {
    const user = lowdb.get("users").find({ email: req.body.email }).value();

    if (!user) {
      return res.status(400).send("Invalid username or password!");
    }

    let hash = user.password;

    bcrypt.compare(req.body.password, hash).then((isPasswordValid) => {
      if (!isPasswordValid) {
        return res.status(400).send("Invalid username or password!");
      }

      const payload = _.pick(user, ["id", "isAdmin", "isVerified"]);

      const token = jwt.sign(payload, process.env.JWT_KEY);
      return res.header("x-auth-token", token).send("Login successful");
    });
  });
};
