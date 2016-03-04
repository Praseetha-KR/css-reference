'use strict';

var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    routes      = require('./routes/cssref')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;
