//Requirements
const app = require('express')();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

//Database setup
var mongoDB = 'mongodb+srv://yarden:kRYfRva4Vh79oPki@cluster0-qfspe.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;

//Bind database to error event
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

//Routes
app.get('/', (req, res) => {
    res.send("Hello World!")
})

//Listener
app.listen(port, () => console.log(`InCheck-Server is listening on port ${port}`))