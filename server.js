var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    config      = require('./config/default'),
    CssRef      = require('./app/models/cssref');

mongoose.connect(config.mongouri);

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to CSS Reference API' });
});
app.use('/api', router);

app.listen(port);
console.log('Server listening on port ' + port);

