'use strict';

var express = require('express'),
    app     = express();

var cssref = require('./routes/cssref')
app.use('/api', cssref);

module.exports = app;
