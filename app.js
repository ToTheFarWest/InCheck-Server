//Requirements
const app = require('express')();
const port = process.env.PORT || 5001;
const mongoose = require('mongoose');
const team_router = require('./routes/team');
const user_router = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//Bind environment variables from .env file
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//Bind utilities to apps
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//Bind routers to app
app.use('/teams', team_router);
app.use('/users', user_router);

//Database setup
var mongoDB = process.env.DB;
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;

//Bind database to error event
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//Routes
app.get('/', (req, res) => {
    res.send("Hello World! This is the Index!");
});

//Listener
app.listen(port, () => console.log(`InCheck-Server is listening on port ${port}`));