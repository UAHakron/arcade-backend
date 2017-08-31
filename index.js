const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/arcade');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));

//listen for requests
app.listen(3308, function()
{
	console.log("Arcade API now running");
}); 
