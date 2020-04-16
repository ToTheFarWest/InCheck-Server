#! /usr/bin/env node

//Get command line args
var userArgs = process.argv.slice(2);


//Import models
var User = require('./models/User');
var Team = require('./models/Team');
var Message = require('./models/Message');

//Connect to DB
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



var users = [];
var teams = [];
var messages = [];


//Make functions
async function userCreate(username, email, password) {
    let userArgs = {
        username: username,
        email: email,
        password: password,
    };

    let user = new User(userArgs);
    let newUser = await user.save();

    users.push(user);
    console.log('New user: ' + user);

    return newUser;
}

async function teamCreate(name, leader, members) {
    let teamArgs = {
        name: name,
        leader: leader,
        members: members
    };

    console.log('TEAM ARGS: ');
    console.log(teamArgs);

    let team = new Team(teamArgs);
    let newTeam = await team.save();

    teams.push(team);
    console.log('New team: ' + team);
    // await TeamUserRelationshipAdd(team.leader, team)

    return newTeam;
}

async function messageCreate(content, author, team) {
    let messageArgs = {
        content: content,
        author: author,
        team: team
    };

    let message = new Message(messageArgs);
    let newMessage = await message.save();

    messages.push(message);
    console.log('New message: ' + message);

    return newMessage;
}

//Team add functions
async function TeamUserRelationshipAdd(user, team) {
    dbUser = await User.findOne({ email: user.email });
    dbTeam = await Team.findOne({ name: team.name });

    if (!dbUser.teams.contains(dbTeam._id)) {
        dbUser.teams.append(dbTeam._id);
    }

    if (!dbTeam.members.contains(dbUser._id)) {
        dbTeam.members.append(dbUser._id);
    }

    newTeamUserRelationship = await User.update(dbUser).then(Team.update(dbTeam));
    return newTeamUserRelationship;
}


async function createNewUsers() {
    await userCreate("johnyboi", "jboi@boii.com", "urmum28");
    await userCreate("admin", "admin@yoursite.com", "iamsecure1999");
    await userCreate("bae", "iloveu@yay.com", "thisisatestpass:D");
}

async function createNewTeams() {
    await teamCreate("SuperCoolSquad", users[0], [users[1]]);
    await teamCreate("NeatoTeamo", users[2], [users[1]]);
    await teamCreate("kill please", users[1], [users[0], users[2]]);
    await teamCreate("politeeks", users[1], [users[2]]);
    await teamCreate("rina best fan club", users[0], [users[2]]);
    await teamCreate("weeb trash", users[2], [users[0]]);
}

async function createNewMessages() {
    await messageCreate("wow this is neat", users[0], teams[0]);
    await messageCreate("coolio", users[2], teams[0]);
    await messageCreate("testestest", users[0], teams[3]);
    await messageCreate("i hate plebbit", users[1], teams[2]);
    await messageCreate("reeeeee", users[2], teams[1]);
}

async function populate() {
    //Clean old data
    await User.remove({}, (err) => {
        console.log("User collection cleared");
    });
    await Team.remove({}, (err) => {
        console.log("Team collection cleared");
    });
    await Message.remove({}, (err) => {
        console.log("Message collection cleared");
    });

    await createNewUsers();
    await createNewTeams();
    await createNewMessages();
}

populate()
    .catch((err) => {
        console.error('FINAL ERROR: ' + err);
    })
    .then(() => {
        console.log('Somehow, it all worked out');
    }
    ).finally(() => {
        mongoose.connection.close();
        console.log("Mongoose connection closed.");
        return;
    });