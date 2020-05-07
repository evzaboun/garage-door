const express = require("express");
const route = express.Router();
const { validate, validateForgot } = require("../middleware/validate");
const { register, activate } = require("../middleware/register");
const login = require("../middleware/login");
const { auth, admin } = require("../middleware/auth");
const { users } = require("../middleware/users");
const { update } = require("../middleware/update");

route.post("/register", validate, register, (req, res) => {
  res.send("User registered successfully!");
});

route.post("/login", validate, login, (req, res) => {
  res.send(`User logged in: ${req.body.email}`);
});

route.get("/activate/:token", activate, (req, res) => {
  res.send(`User activated!`);
});

route.post("/forgot", validateForgot, (req, res) => {
  res.send(
    `To reset your password follow the information sent in your email: ${req.body.email}`
  );
});

route.get("/users", auth, admin, users, (req, res) => {
  res.send("All users sent...");
});

route.put("/assign/:email", auth, admin, update, (req, res) => {
  res.send("Passed all the tests!!!!");
});

// //User can get his own profile
// route.get("/profile", (req, res) => {});

// //Delete user from the DB (Admin only)
// route.delete("/:id", (req, res) => {});

// //Garage controller route (Admin only)
// route.get("/", auth, admin, (req, res) => {});

module.exports = route;
