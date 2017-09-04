const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/registeredUsers', { useMongoClient: true });﻿
mongoose.Promise = global.Promise;


app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));


app.use('/', express.static(path.join(__dirname, 'leaderboard/dist')))

//listen for requests
app.listen(3308, function()
{
	console.log("Arcade API now running");
}); 
