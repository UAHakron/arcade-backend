const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//UserSchema represents a User.  Each user has a name, NFC id (nfc), email, and bits.  
const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name field is required"]
		
	},

	nfc: {
		type: String,
		required: [true, "ID is required"]
	},

	email:{
		type: String,
		required: [true, "Email is required"]
	},

	bits:{
		type: Number,
		required: [true, "Bits are required"]
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
