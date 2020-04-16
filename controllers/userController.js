const User = require("../models/User.js");

exports.get_all_users = async function (req, res) {
    let users = await User.find({}, 'username');
    res.json(users);
};

exports.user_get = async function (req, res) {
    const id = req.params.id;
    const user = await User.findById(id, 'username teams');
    res.json(user);
};

exports.user_get_self = async function (req, res) {
    const user = req.user;
    res.status(200).json({user: user});
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

exports.user_logout = async function (req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.status(200).send();
    }
    catch (error) {
        res.status(500).json({error: error});
    }
};

exports.user_logout_all = async function (req, res) {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.status(200).send();
    }
    catch (error) {
        res.status(500).json({error: error});
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
        res.status(200).json({user: user});
    }
    catch (error) {
        res.status(400).json({error: error});
    }
};