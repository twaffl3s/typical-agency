var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Persons', PersonSchema);
