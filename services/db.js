const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");
const db = {};

db.init = function () {
  low(adapter).then((lowdb) => {
    return lowdb.defaults({ users: {} }).write();
  });
};

// //Admin can assign roles to users
// db.assign = function (user) {};

// db.base64encode = function (str) {
//   return Buffer.from(str).toString("base64");
// };

// db.base64decode = function (base64str) {
//   return Buffer.from(base64str, "base64").toString("ascii");
// };

// db.generateToken = function (id) {
//   console.log("Token generated successfully!");
// };

module.exports = db;
