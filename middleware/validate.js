const { registrationAndLoginSchema } = require("../model/schemas");
const { forgotSchema } = require("../model/schemas");

exports.validate = (req, res, next) => {
  const { error } = registrationAndLoginSchema.validate(
    JSON.parse(JSON.stringify(req.body))
  );
  const valid = error == null;
  if (valid) {
    next();
  } else {
    res.status(422).send(error.message);
  }
};

exports.validateForgot = (req, res, next) => {
  const { error } = forgotSchema.validate(JSON.parse(JSON.stringify(req.body)));
  const valid = error == null;
  if (valid) {
    next();
  } else {
    res.status(422).send(error.message);
  }
};
