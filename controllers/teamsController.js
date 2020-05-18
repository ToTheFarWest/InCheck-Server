var Team = require('../models/Team');
var User = require('../models/User');
var Message = require('../models/Message');

//Send a list of the user's team
exports.user_teams_list = async function (req, res) {
    try {
        //Populate the user teams list
        let user = await User.findById(req.user._id).populate('teams', 'name');

        res.status(200).json({teams: user.teams});
    }
    catch (error) {
        res.status(500).json({error: error});
    }
};

exports.team_get = async function(req, res) {
    try {
        const team = await Team.findById(req.params.team).populate('leader members', 'username');
        if (!team)
        {
            return res.status(404).json({error: "That server was not found"});
        }
        //Checks if user is a member of the team
        if (team.members.some(member => member.equals(req.user._id) == false)) {
            return res.status(403).json({error: "You do not have permission to access this resource."});
        }

        //Returns the team item
        return res.status(200).json({team: team});
    }
    catch (error) {
        res.status(500).json({error: error});
    }
};

//Creates new team, with logged in user being the Team Leader
exports.team_create = async function (req, res) {
    try {
        let teamBlueprint = req.body;
        teamBlueprint.leader = req.user._id;
        teamBlueprint.members = [req.user._id];
        team = new Team(teamBlueprint);
        await team.save();
        //Update user to have the new team
        req.user.teams.push(team._id);
        await req.user.save();
        res.status(201).json({team: team});
    }
    catch (error) {
        res.status(500).json({error: error});
    }
};

exports.team_delete= async function (req, res) {
    try {
        const id = req.params.team;
        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({error: "That server was not found"});
        }
        if (req.user._id.equals(team.leader) === false) {
            return res.status(403).send("You are not authorized for this action.");
        }
        //Delete team reference from users
        team.members.forEach(async (id) => {
            let member = await User.findById(id);
            let index = member.teams.indexOf(team._id);
            if (index !== -1) member.teams.splice(index,1);
            await member.save();
        });
        await Team.findByIdAndDelete(id);
        res.status(200).json({team: team});
    }
    catch (error)
    {
        res.status(500).json({error: error});
    }
};

exports.team_message_create = async function (req, res) {
    try {
        const team = await Team.findById(req.params.team);
        if (!team)
        {
            return res.status(404).json({error: "That server was not found"});
        }
        //Checks if user is a member of the team
        if (team.members.some(member => member.equals(req.user._id) == false)) {
            return res.status(403).json({error: "You do not have permission to access this resource."});
        }

        messageBlueprint = req.body;
        messageBlueprint.author = req.user._id;
        messageBlueprint.team = team._id;

        message = new Message(messageBlueprint);
        await message.save();
        return res.status(201).json({message: message});
    }
    catch (error) {
        res.status(500).json({error: error});
    }
};

exports.team_get_all_messages = async function (req, res) {
    try {
        const team = await Team.findById(req.params.team);
        if (!team)
        {
            return res.status(404).json({error: "That server was not found"});
        }
        //Checks if user is a member of the team
        if (team.members.some(member => member.equals(req.user._id) == false)) {
            return res.status(403).json({error: "You do not have permission to access this resource."});
        }
        messages = await Message.find({team: team}).populate('author', 'username');
        res.status(200).json({messages: messages});
    }
    catch (error) {
        res.status(500).send({error: error});
    }
};

exports.team_invite = async function (req, res) {
    try{
        const team = await Team.findById(req.params.team);
        const user = await User.findById(req.query.user);
        if (!team) {
            return res.status(404).json({error: "That team was not found"});
        }
        if (!user) {
            return res.status(404).json({error: "That user was not found"});
        }
        //Checks if user is the team leader
        if (team.leader.equals(req.user._id) == false) {
            return res.status(403).json({error: "You must be the team leader to invite new members"});
        }
        //Adds user to team
        team.members.push(user._id);
        user.teams.push(team._id);
        team.save();
    }
    catch (error) {
        res.status(500).send({error: error});
    }
};