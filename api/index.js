const express = require("express");
const bodyParser = require("body-parser");
const Cors = require("cors");
require("dotenv").config();

const app = express();

const { StatusOk } = require("./Controllers/Response");

app.use(bodyParser());
app.use(Cors());

app.get("/", (req, res) => {
  return StatusOk(
    req,
    res,
    200,
    "Welcome to the leave api created by shane kolkoto <shanekolkoto@gmail.com>"
  );
});

app.use("/employee", require("./routes/users.routes"));
app.use("/apply-leave", require("./routes/leave.routes"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
