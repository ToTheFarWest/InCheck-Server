InCheck-Server
==============

API for my InCheck project

Installation Instructions
-------------------------

1) Install [Node.js](https://nodejs.org/en/)
2) Install all requirements automatically with `npm install`
3) Set up a MongoDB Database
4) Configure the [.env example](./.env.example) file and rename it to `.env`
5) Run the server with `node app.js`. By default it will run on Port 5001, which can be changed through the `process.env.PORT` variable.

*OPTIONAL*: To quickly test your database I created a [script](./populatedb.js) to create some sample objects. Simply run it with `node populatedb.js`.