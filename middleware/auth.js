const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.redirect(401, "/login");
    }
    req.user = decodedToken;
    next();
  });
};
