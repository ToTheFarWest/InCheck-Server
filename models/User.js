var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: val => {
            if (!validator.isEmail(val)) {
                throw new Error({error: 'Invalid Email address'});
            }
        }
    },
    password: {type: String, required: true, minlength: 7},
    teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//Middleware
UserSchema.pre('save', async function (next) {
    //Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.methods.generateAuthToken = async function() {
    //Generates an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

UserSchema.statics.findByCredentials = async function (email, password) {
    //Searches for a user by email and password
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error({ error: "Invalid login credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;