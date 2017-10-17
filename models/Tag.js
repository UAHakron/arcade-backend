const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//UserSchema represents a User.  Each user has a name, NFC id (nfc), email, and bits.  
var TagSchema = new Schema({
	nfc: {
		type: String,
		required: [true, "ID is required"],
		unique: true
	},

	person:{
		type: String,
		required: [true, "Person is required"]
	}
});

TagSchema.plugin(uniqueValidator);
const Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
