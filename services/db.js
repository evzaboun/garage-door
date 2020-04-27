const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const db = {};

db.init = function () {
  low(adapter).then((lowdb) => {
    return lowdb.defaults({ users: {} }).write();
  });
};

db.register = function (req, res, next) {
  let user = JSON.parse(JSON.stringify(req.body));

  low(adapter).then((lowdb) => {
    let userExists = lowdb
      .get("users")
      .has(`${db.base64encode(user.email)}`)
      .value();

    if (userExists) {
      return res.status(400).send("User exists!");
    }

    let numberOfUsers = lowdb.get("users").size().value();

    const newUser = {
      email: `${user.email}`,
      password: `${user.password}`,
      admin: numberOfUsers === 0 ? true : false,
    };

    lowdb
      .set(`users[${db.base64encode(user.email)}]`, newUser)
      .write()
      .then(next());
  });
};

db.login = function (user) {};

db.delete = function (user) {};

db.update = function (user) {};

//Admin can assign roles to users
db.assign = function (user) {};

db.base64encode = function (str) {
  return Buffer.from(str).toString("base64");
};

db.base64decode = function (base64str) {
  return Buffer.from(base64str, "base64").toString("ascii");
};

module.exports = db;
