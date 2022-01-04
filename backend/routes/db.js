const pg = require("pg");
// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "Microsemi**2",
//   database: "pledges_list",
// });
// const url =
//   "postgres://gacsncbmlletln:6d75b9bed@ec2-18-210-95-55.compute-1.amazonaws.com:5432/dbfd4d1q5226fk";
const url = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: url,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;