const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');

// Route to register a new admin (you might want to protect this or use it only for initial setup)
router.post('/register', registerAdmin);

// Route for admin login
router.post('/login', loginAdmin);

module.exports = router;
