var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    leader: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}] 
});

module.exports = mongoose.model('Team', TeamSchema);
