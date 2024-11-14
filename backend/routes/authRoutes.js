const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const {registerAdmin, loginAdmin} = require ('../controllers/authController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);  

module.exports = router;
