const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const { sendActivationEmail } = require("../services/sendEmail");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const _ = require("lodash");
require("dotenv").config();
const saltRounds = 10;

exports.register = (req, res) => {
  low(adapter).then((lowdb) => {
    const user = lowdb.get("users").find({ email: req.body.email }).value();

    if (user) {
      return res.status(400).send("User exists!");
    }

    let numberOfUsers = lowdb.get("users").size().value();

    bcrypt.genSalt(saltRounds).then((salt) => {
      bcrypt.hash(req.body.password, salt).then((hash) => {
        // Store hashed password in DB.
        const newUser = {
          email: req.body.email,
          password: hash,
          isAdmin: numberOfUsers === 0 ? true : false,
          isVerified: false,
          id: shortid.generate(),
        };

        lowdb
          .get("users")
          .push(newUser)
          .write()
          .then(() => {
            sendActivationEmail(_.pick(newUser, ["email", "id"]))
              .then((result) => {
                return res.send(result);
              })
              .catch((err) => {
                console.log(err);
                return res.send(
                  "Error occured with email sending. Please try again later."
                );
              });
          });
      });
    });
  });
};

exports.activate = (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res
      .status(400)
      .send("Something went wrong with the activation proccess!");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(400).send(`Expired link!`);
    }

    low(adapter).then((lowdb) => {
      lowdb
        .get("users")
        .find({ id: decodedToken.id })
        .assign({ isVerified: true })
        .write()
        .then(() => {
          return res.send(`Email Activated!`);
        });
    });
  });
};
