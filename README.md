# Express Project Boilerplate Checklist

## Setting Up Express 

- Run `express-generator` to scaffold express app with: `express -e project-name-here`
- `cd` into newly generated project folder
- install node packages with  `npm i` 
- Rename `app.js` to `server.js`
- change line 7 on `bin/www` to be:
```
var app = require('../server');
```
- Run Nodemon before advancing to next steps to insure setup is correct. Nodemon should say `[nodemon] starting node ./bin/www`

## Setting up Enviroment Vars
- Install dotenv package with `npm i dotenv`
- Require dotenv package in `server.js`
- `touch .env` file on the root, base, level of the project to make a .env file to hold secret vars
- in `server.js` on line 7, below package imports and add this: `require('dotenv').config();`

## Set up MongoDB Connection
- run `npm i mongoose` to install mongoose package
- Inside `env` create a line with `DATABASE_URL=MONGODBCONNECTION STRING HERE`
- If using hosted MongoDB, make sure MongoDB service is running
- `mkdir config` to make config folder
- `touch database.js` to have a database connection file
- inside of `database.js` have this content:
```
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
```