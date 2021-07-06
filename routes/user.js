const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const emailRegexp =
	/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const signJwt = async (user, res) => {
	const payload = {
		user: {
			id: user.id,
		},
	};

	await jwt.sign(
		payload,
		process.env.jwtSecret,
		{ expiresIn: 3600000 },
		(err, token) => {
			if (err) throw err;
			res.send({ token });
		}
	);
};

router.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).send('enter both fields');
		}

		if (!emailRegexp.test(email)) {
			res.status('400').send('invalid email');
		}

		const check = await User.findOne({ email });

		if (check) {
			res.status(400).send('User already exists');
		} else {
			const user = new User({
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			signJwt(user, res);
		}
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) res.status('400').send('enter both fields');

		const check = await User.findOne({ email });

		if (check) {
			const test = await bcrypt.compare(password, check.password);
			if (test) {
				const user = await User.findOne({ email }).select('-password');

				signJwt(user, res);
			} else {
				res.status('401').send('Invalid password');
			}
		} else {
			res.status('404').send('User not found');
		}
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
