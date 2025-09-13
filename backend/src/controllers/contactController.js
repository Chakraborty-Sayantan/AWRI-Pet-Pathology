const db = require('../config/db');
const { validationResult } = require('express-validator');

// Handles submitting the contact form
exports.submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, service, message, newsletter } = req.body;
  const query = 'INSERT INTO contact_submissions (name, email, phone, service_interest, message, newsletter) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [name, email, phone, service, message, newsletter];

  try {
    await db.query(query, values);
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error during contact form submission' });
  }
};

// Handles fetching all contact submissions for the admin dashboard
exports.getAllContactSubmissions = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM contact_submissions ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching contact submissions' });
  }
};