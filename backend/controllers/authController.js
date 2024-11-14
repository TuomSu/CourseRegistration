// controllers/authController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// Adminin rekisteröinti
exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminExists = await Admin.findOne({ username });
    
    if (adminExists) {
      return res.status(400).json({ message: 'Admin username already exists' });
    }
    
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Virhe rekisteröinnissä:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// Adminin kirjautuminen
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
