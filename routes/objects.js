const express = require('express');
const Objects = require('../models/objects');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const objects = await Objects.find();
		res.send(objects);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, price } = req.body;
		const obj = new Objects({ name, price });
		await obj.save();
		res.send(obj);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
