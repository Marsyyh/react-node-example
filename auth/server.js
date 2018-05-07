'use strict'

require('dotenv').config()
var app = require('./src/app');
var port = process.env.PORT || 4999;

// var db = require('./src/db/sql/models');
// db.sequelize.sync();

app.listen(port);
console.log('server started on port ' + port);
