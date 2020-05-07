const _ = require("lodash");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("./db.json");

exports.update = (req, res) => {
  low(adapter).then((lowdb) => {
    const { isAdmin } = lowdb
      .get("users")
      .find({ email: req.params.email })
      .value();

    lowdb
      .get("users")
      .find({ email: req.params.email })
      .assign({ isAdmin: !isAdmin })
      .write()
      .then((user) =>
        res.send({
          message: `${user.email} permissions updated!`,
          isAdmin: user.isAdmin,
        })
      )
      .catch((err) => res.send(err));
  });
};
