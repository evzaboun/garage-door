const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.send(err);
      //return res.redirect(401, "/login");
    }
    req.user = decodedToken;
    next();
  });
};

exports.admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Forbidden. User not an admin!");
  }
  next();
};

exports.verified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).send("Forbidden. Unverified email!");
  }
  next();
};
