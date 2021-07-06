const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

const app = express();

app.use(cors());
app.use(
	express.json({
		extended: false,
	})
);

connectDB();

app.get('/', (req, res) => {
	res.send('Server Running');
});

app.use('/user', require('./routes/user'));
app.use('/objects', require('./routes/objects'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
