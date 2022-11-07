const express = require("express");
const userController = require("../Controllers/UserController.js");

const userRoute = express.Router();

userRoute.get("/", (req, res) => {
  return userController.getUser(req, res);
});
userRoute.post("/find-user", (req, res) => {
  return userController.findUser(req, res);
});

module.exports = userRoute;
