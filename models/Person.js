const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//UserSchema represents a User.  Each user has a name, NFC id (nfc), email, and bits.  
var PersonSchema = new Schema({
	name: {
		type: String,
		required: [true, "ID is required"]
	},

	email:{
		type: String,
		required: [true, "Person is required"],
        unique: true
	},

    bits: {
        type: Number,
        required: [true, "Bits is required"]
    }
});

PersonSchema.plugin(uniqueValidator);
const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
