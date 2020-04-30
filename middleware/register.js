const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function (req, res, next) {
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
          admin: numberOfUsers === 0 ? true : false,
          isEmailVerified: false,
        };

        lowdb
          .set(`users[${base64encode(user.email)}]`, newUser)
          .write()
          .then(next());
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

//   const generateToken = (id) => {
//     console.log("Token generated successfully!");
//   };
