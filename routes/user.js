const express = require("express");
const route = express.Router();
const db = require("../services/db");
const validate = require("../middleware/validate");
const { register, activate } = require("../middleware/register");
const login = require("../middleware/login");

//Register new user to the DB (TODO: Authentication only)
route.post("/register", validate, register, (req, res) => {
  res.send("User registered successfully!");
});

route.get("/activate/:token", activate, (req, res) => {
  res.send(`User activated!`);
});

//Login user to the DB (TODO: Authentication only)
route.post("/login", validate, login, (req, res) => {
  res.send(`User logged in: ${JSON.stringify(req.body.email)}`);
});

//Login user to the DB (TODO: Authentication only)
route.post("/forgot", (req, res) => {
  res.send(
    `Reset your password: Email sent at: ${JSON.stringify(req.body.email)}`
  );
});

//Get users from the DB
route.get("/:id", (req, res) => {});

//Delete user from the DB (TODO: Authentication only)
route.delete("/:id", (req, res) => {});

//Update existing user of the DB (TODO: Authentication only)
route.put("/:id", (req, res) => {});

module.exports = route;
