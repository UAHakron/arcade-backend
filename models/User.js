const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//UserSchema represents a User.  Each user has a name, NFC id (nfc), email, and bits.  
var UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name field is required"]
		
	},

	nfc: {
		type: String,
		required: [true, "ID is required"],
		unique: true
	},

	email:{
		type: String,
		required: [true, "Email is required"],
		unique: true
	},

	bits:{
		type: Number,
		required: [true, "Bits are required"]
	}
});

UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema);
module.exports = User;
