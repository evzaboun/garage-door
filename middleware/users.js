const _ = require("lodash");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");

exports.users = (req, res) => {
  low(adapter).then((lowdb) => {
    const users = lowdb.get("users").value();
    const filteredUsers = [];
    users.forEach((user) => {
      if (user.id !== req.user.id) {
        filteredUsers.push(_.pick(user, ["email", "isAdmin", "isVerified"]));
      }
    });
    res.send(filteredUsers);
  });
};
