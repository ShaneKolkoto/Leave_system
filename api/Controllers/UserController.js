const con = require("../db/db_connection.js");
const { StatusOk, Error, Internal } = require("../Controllers/Response");

async function getUser(req, res) {
  try {
    con.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        return Error(req, res, 400, "User table seems empty");
      } else {
        return StatusOk(req, res, 200, result);
      }
    });
  } catch (error) {
    return Internal(req, res, 500, error);
  }
}

async function findUser(req, res) {
  let userSql = "SELECT * FROM users WHERE ?";
  let user = {
    email: req.body.email,
  };
  con.query(userSql, user, (err, result) => {
    if (err) throw err;
    if (result.length !== 0) {
      let userSql = "SELECT * FROM users JOIN leave_application WHERE ?";
      let user = {
        email: result[0].email,
      };
      con.query(userSql, user, (err, data) => {
        if (err) throw err;
        console.log(data);
        return StatusOk(req, res, 200, data);
      });
    } else {
      Error(req, res, 400, "User not found");
    }
  });
}

module.exports = {
  getUser,
  findUser,
};
