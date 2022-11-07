const { StatusOk, Error, Internal } = require("../Controllers/Response");
const date = require("./DateCalculation.js");
const userController = require("./userController.js");
const con = require("../db/db_connection");

async function applyLeave(req, res) {
  let { leave_type, start_date, end_date, name, surname, email, contact } =
    req.body;
  if (
    (name === "" || name === null) &&
    (surname === "" || surname === null) &&
    (email === "" || email === null) &&
    (leave_type === "" || leave_type === null) &&
    (start_date === "" || start_date === null) &&
    (end_date === "" || end_date === null) &&
    (contact === "" || contact === null)
  ) {
    return Error(req, res, 400, "Please complete form");
  } else if (name === "" || name === null) {
    return Error(req, res, 400, "Name is required");
  } else if (surname === "" || surname === null) {
    return Error(req, res, 400, "Surname is required");
  } else if (email === "" || email === null) {
    return Error(req, res, 400, "Email is required");
  } else if (leave_type === "" || leave_type === null) {
    return Error(req, res, 400, "Leave Type is required");
  } else if (start_date === "" || start_date === null) {
    return Error(req, res, 400, "Start date is required");
  } else if (end_date === "" || end_date === null) {
    return Error(req, res, 400, "End date is required");
  } else if (contact === "" || contact === null) {
    return Error(req, res, 400, "Contact is required");
  } else {
    const days = await date(start_date, end_date);
    let userSql = "SELECT * FROM users WHERE ?";
    let user = {
      email: email,
    };
    con.query(userSql, user, (err, result) => {
      if (err) throw err;
      //   If there is a user
      if (result.length !== 0) {
        if (result[0].amount_leave_date <= 0) {
          Error(req, res, 400, "Cant apply for leave");
        } else {
          let formSql = "INSERT INTO leave_application SET ?";
          let form = {
            user_id: result[0].user_id,
            leave_type,
            start_date,
            end_date,
            amount_of_days: days,
            created_at: new Date(),
          };
          con.query(formSql, form, (err, leave) => {
            if (err) throw err;
            let updateSql = `UPDATE users SET ? WHERE user_id = ${result[0].user_id}`;
            let updateUser = {
              amount_leave_days: result[0].amount_leave_days - days,
            };
            con.query(updateSql, updateUser, (err, newLeavDays) => {
              if (err) throw err;
              if (newLeavDays) {
                return StatusOk(req, res, 200, "Form submitted successfully");
              }
            });
          });
        }
      } else {
        // New user gets inserted and form gets submitted
        let userSql = "INSERT INTO users SET ?";
        let user = {
          name,
          surname,
          email,
          contact,
          create_date: new Date(),
        };
        con.query(userSql, user, (err, result) => {
          if (err) throw err;
          if (result) {
            // get user data
            let userSql = "SELECT * FROM users WHERE ?";
            let user = {
              email: email,
            };
            con.query(userSql, user, (err, result) => {
              if (err) throw err;
              else {
                let formSql = "INSERT INTO leave_application SET ?";
                let form = {
                  user_id: result[0].user_id,
                  leave_type,
                  start_date,
                  end_date,
                  amount_of_days: days,
                  created_at: new Date(),
                };
                con.query(formSql, form, (err, data) => {
                  if (err) throw err;
                  let updateSql = `UPDATE users SET ? WHERE user_id = ${result[0].user_id}`;
                  let updateUser = {
                    amount_leave_days: result[0].amount_leave_days - days,
                  };
                  con.query(updateSql, updateUser, (err, newLeavDays) => {
                    if (err) throw err;
                    if (newLeavDays) {
                      return StatusOk(
                        req,
                        res,
                        200,
                        "Form submitted successfully"
                      );
                    }
                  });
                });
              }
            });
          }
        });
      }
    });
  }
}

async function getAllLeave(req, res) {}

module.exports = {
  applyLeave,
};
