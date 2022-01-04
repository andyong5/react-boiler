const express = require("express");
const router = express.Router();
const pool = require("./db");

router.post("/", function (req, res, next) {
  var name = req.body.name.toUpperCase();
  console.log(name);
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query(
      "select name, family from pledges where name = $1",
      [name],
      (err, result) => {
        release();
        if (err) {
          res.status(500).send({ message: err.stack });
          return console.error("Error executing query", err.stack);
        }
        if (result.rowCount == 0) {
          console.log("Invalid Name");
          res.status(400).send({ message: "Invalid Name" });
        } else {
          console.log(result.rows[0]);
          res.json(result.rows[0]);
        }
      }
    );
  });
});

module.exports = router;