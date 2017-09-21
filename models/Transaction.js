const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//UserSchema represents a User.  Each user has a name, NFC id (nfc), email, and bits.  
var TransactionSchema = new Schema({
	nfc: {
		type: String,
		required: [true, "ID is required"],
	},

	bits:{
		type: Number,
		required: [true, "Bits are required"]
	},

    reader: {
        type: String,
        required: [true, "Reader is required"]
    },

    location: {
        type: String,
        required: [true, "Location is required"]
    }

},
    timestamps: true);

TransactionSchema.plugin(uniqueValidator);
const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
