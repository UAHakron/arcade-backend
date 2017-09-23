const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//UserSchema represents a User.  Each user has a name, NFC id (nfc), email, and bits.  
var ReaderSchema = new Schema({
	num: {
		type: Number,
		required: [true, "Num is required"],
		unique: true
	},

    location: {
        type: String,
        required: [true, "A location is required"]
    },

    value: {
        type: Number,
        required: [true, "value is required"]
    },
    
    cooldown: {
        type: Number,
        required: [true, "cooldown is required"]
    }

},
    {timestamps: true});

ReaderSchema.plugin(uniqueValidator);
const Reader = mongoose.model('Reader', ReaderSchema);
module.exports = Reader;
