const mongoose = require('mongoose');

const connectDB = async () => {
	try {
        const db = process.env.mongoURI;
		mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log('MongoDB connected...');
	} catch (err) {
		console.error(err.message);
		//Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
