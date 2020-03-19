var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

var Schema = mongoose.Schema

var UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    teams: [{type: Schema.Types.ObjectId, ref: 'Team'}]
})

// //Password hashing
// UserSchema.pre('save', (next) => {
//     var user = this;
//     //Only hash the password if it has been modified
//     if (!user.isModified('password')) return next();

//     //Generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) return next(err);

//         //Hash password with salt
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err)

//             //Override user password with hash
//             user.password = hash

//             //Callback
//             next()
//         })
//     })
// })

// //Compare passwords
// UserSchema.methods.comparePassword = (password, next) => {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         if (err) return next(err)
//         next(null, isMatch)
//     })
// }

module.exports = mongoose.model('User', UserSchema)