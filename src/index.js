const app = require('express')();
const port = 5000;
const routes = require('./routes/')
app.use('/ree', routes)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});