var Team = require('../models/Team');
var User = require('../models/User');

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

//Creates new team, with logged in user being the Team Leader
exports.team_create = async function (req, res) {
    try {
        let teamBlueprint = req.body;
        teamBlueprint.leader = req.user;
        team = new Team(teamBlueprint);
        await team.save();
        //Update user to have the new team
        req.user.teams.push(team);
        await req.user.save();
        res.status(201).json({team: team});
    }
    catch (error) {
        res.status(500).json({error: error});
    }
};

exports.team_delete= async function (req, res) {
    res.send("Not implemented yet!");
};
