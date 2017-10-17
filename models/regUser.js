const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create regUser Schema & model

const regUserSchema = new Schema({
	//req contains name, id, email, bits
	name: {
		type: String,
		required: [true, "Name field is required"]
		
	},

	nfcID: {
		type: String,
		required: [true, "ID is required"]
	},

	email:{
		type: String,
		required: [true, "Email is required"]
	},

	bits:{
		type: String,
		required: [true, "Bits are required"]
	}
});

const RegUser = mongoose.model('regUser', regUserSchema);

module.exports = RegUser;