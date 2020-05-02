const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY);
};

exports.generateActivationToken = (payload, minutes) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: minutes * 60 });
};
