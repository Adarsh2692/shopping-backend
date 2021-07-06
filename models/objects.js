const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	price: {
		type: Number,
	},
});

module.exports = Objects = mongoose.model('object', ObjectSchema);
