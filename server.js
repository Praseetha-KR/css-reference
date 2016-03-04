var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/default'),
    app         = require('./app');

mongoose.connect(config.mongouri);

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Server listening on port ' + port);

