const User = require("../models/User.js");

exports.get_all_users = async function (req, res) {
    let users = await User.find();
    res.json(users);
};

exports.user_get = async function (req, res) {
    let id = req.params.id;
    let user = await User.findById(id);
    res.json(user);
};

exports.user_login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({error: 'Login failed! Check login credentials'});
        }
        const token = await user.generateAuthToken();
        res.json({user: user, token: token});
    }
    catch (error) {
        res.status(400).json({error: error});
    }
};

exports.user_create = async function (req, res) {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({error: error});
    }
};

exports.user_delete = async function (req, res) {
    const user = req.user;
    try {
        await User.findByIdAndDelete(user._id);
    }
    catch (error) {
        res.status(400).json({error: error});
    }
};

exports.user_create_post = async function (req, res) {
    res.send("Not implemented yet!");
};

exports.user_create_post = async function (req, res) {
    res.send("Not implemented yet!");
};

exports.user_create_post = async function (req, res) {
    res.send("Not implemented yet!");
};