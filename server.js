var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    config      = require('./config/default'),
    app         = require('./app');

mongoose.connect(config.mongouri);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Server listening on port ' + port);

