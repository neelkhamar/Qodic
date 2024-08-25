const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
    try {
        const { fullname, username, password } = req.body;
        if (!username || !password || !fullname) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.status(401).json({ error: 'Username already taken. Try a different username.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, fullname, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWTSecret, {
            expiresIn: '1h',
        });
        res.status(200).json({ token, username: user?.username, fullname: user?.fullname });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;