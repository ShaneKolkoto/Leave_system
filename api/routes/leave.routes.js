const express = require("express");
const leaveController = require("../Controllers/LeaveController.js");

const leaveRoute = express.Router();

leaveRoute.post("/", (req, res) => {
  return leaveController.applyLeave(req, res);
});

module.exports = leaveRoute;
