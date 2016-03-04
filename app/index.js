'use strict';

var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    cssref      = require('./routes/cssref')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', cssref);

module.exports = app;
