const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const db = {};

db.init = function () {
  low(adapter).then((lowdb) => {
    return lowdb.defaults({ users: [] }).write();
  });
};

module.exports = db;
