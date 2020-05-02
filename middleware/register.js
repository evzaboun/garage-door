const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sendActivationEmail } = require("../services/sendEmail");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = function (req, res) {
  let user = JSON.parse(JSON.stringify(req.body));

  low(adapter).then((lowdb) => {
    let userExists = lowdb
      .get("users")
      .has(`${base64encode(user.email)}`)
      .value();

    if (userExists) {
      return res.status(400).send("User exists!");
    }

    let numberOfUsers = lowdb.get("users").size().value();

    bcrypt.genSalt(saltRounds).then((salt) => {
      bcrypt.hash(user.password, salt).then((hash) => {
        // Store hashed password in DB.
        const newUser = {
          email: user.email,
          password: hash,
          isAdmin: numberOfUsers === 0 ? true : false,
          isVerified: false,
        };

        lowdb
          .set(`users[${base64encode(user.email)}]`, newUser)
          .write()
          .then(() => {
            sendActivationEmail(user.email)
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

exports.activate = function (req, res) {
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
        .set(`users.${base64encode(decodedToken.email)}.isVerified`, true)
        .write()
        .then(() => {
          return res.send(`Email Activated!`);
        });
    });
  });
};

const base64encode = (str) => {
  return Buffer.from(str).toString("base64");
};

// const base64decode = (base64str) => {
//   return Buffer.from(base64str, "base64").toString("ascii");
// };
