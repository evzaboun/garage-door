const schema = require("../model/schemas");

const validate = (req, res, next) => {
  const { error } = schema.validate(JSON.parse(JSON.stringify(req.body)));
  const valid = error == null;
  if (valid) {
    next();
  } else {
    res.status(422).send(error.message);
  }
};

module.exports = validate;
