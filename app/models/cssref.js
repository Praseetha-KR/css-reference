var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CssRefSchema = new Schema({
    name: String
});

module.exports = mongoose.model('CssRef', CssRefSchema);

