'use strict'

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB
})

con.on('error', (err) => {
  console.log(err);
  con.end();
});

var query = (sql) => {
  return new Promise((res, rej) => {
    con.connect((err) => {
      if (err) {
        return rej(err);
      }
    });

    con.query(sql, (err, data) => {
      if (err) {
        return rej(err);
      } else {
        con.end();
        res(data);
      }
    });
  });
}

module.exports = {
  query: query,
  format: mysql.format
};
