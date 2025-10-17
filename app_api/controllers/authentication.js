// app_api/controllers/authentication.js
const mongoose = require('mongoose');
const { connect } = require('../models/database');

// Ensure the model is registered on mongoose:
require('../models/user');                // loads user.js
const User = mongoose.model('users');     // uses the name from user.js

// POST /API/auth/register  { email, name, password }
const register = async (req, res) => {
  try {
    await connect();

    const { email, name, password } = req.body || {};
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password are required' });
    }

    // Check duplicates
    const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    // Create and set password (crypto + salt/hash)
    const user = new User({
      email: String(email).toLowerCase().trim(),
      name: String(name).trim()
    });
    user.setPassword(password);

    await user.save();

    // Issue JWT using the model method
    const token = user.generateJwt();
    return res.status(201).json({ token, email: user.email, name: user.name });
  } catch (e) {
    console.error('AUTH REGISTER ERROR:', e);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

// POST /API/auth/login  { email, password }
const login = async (req, res) => {
  try {
    await connect();

    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await User.findOne({ email: String(email).toLowerCase().trim() });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = user.generateJwt();
    return res.status(200).json({ token, email: user.email, name: user.name });
  } catch (e) {
    console.error('AUTH LOGIN ERROR:', e);
    return res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
