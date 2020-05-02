const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const db = {};

db.init = function () {
  low(adapter).then((lowdb) => {
    return lowdb.defaults({ users: [] }).write();
  });
};

// //Admin can assign roles to users
// db.assign = function (user) {};

module.exports = db;
