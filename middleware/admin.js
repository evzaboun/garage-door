exports.admin = (req, res, next) => {
  if (!req.user.isAdmin || !req.user.isVerified) {
    return res
      .status(403)
      .send("Forbidden. User not an admin, or unverified email!");
  }

  next();
};
