const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// IMPORTANT: Use a strong, secret key in your .env file
const jwtSecret = process.env.JWT_SECRET || 'your_default_secret_key';

// @desc    Register a new admin (for setup purposes)
// @route   POST /api/auth/register
exports.registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.query(
            "INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Authenticate admin & get token
// @route   POST /api/auth/login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await db.query("SELECT * FROM admins WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.rows[0].id,
            },
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
