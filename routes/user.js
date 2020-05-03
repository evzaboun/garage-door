const express = require("express");
const route = express.Router();
const { validate, validateForgot } = require("../middleware/validate");
const { register, activate } = require("../middleware/register");
const login = require("../middleware/login");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

route.post("/register", validate, register, (req, res) => {
  res.send("User registered successfully!");
});

route.get("/activate/:token", activate, (req, res) => {
  res.send(`User activated!`);
});

route.post("/login", validate, login, (req, res) => {
  res.send(`User logged in: ${JSON.stringify(req.body.email)}`);
});

//Forgot password
route.post("/forgot", validateForgot, (req, res) => {
  res.send(
    `Reset your password: Email sent at: ${JSON.stringify(req.body.email)}`
  );
});

//User can get his own profile
route.get("/profile", (req, res) => {});

// Ask for elevated permissions (Non admin users)
route.post("/elevate", (req, res) => {});

// Give elevated permissions (Admin only)
route.post("/assign", auth, admin, (req, res) => {
  res.send("Passed all the tests!!!!");
});

// //Get all users from the DB (Admin only)
// route.get("/:id", (req, res) => {});

// //Delete user from the DB (Admin only)
// route.delete("/:id", (req, res) => {});

// //Update existing user(Admin only)
// route.put("/:id", (req, res) => {});

// //Garage controller route (Admin only)
// route.get("/", auth, admin, (req, res) => {});

module.exports = route;
