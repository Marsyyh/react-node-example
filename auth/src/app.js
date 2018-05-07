'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

var routes = require('./routes');

app.use('/api', routes);

module.exports = app;
