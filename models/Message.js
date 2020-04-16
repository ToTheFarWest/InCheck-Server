var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    content: String,
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    team: {type: Schema.Types.ObjectId, ref: 'Team', required: true}
});

module.exports = mongoose.model('Message', MessageSchema);