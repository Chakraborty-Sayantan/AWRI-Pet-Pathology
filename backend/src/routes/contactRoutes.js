const express = require('express');
const router = express.Router();
const { submitContactForm, getAllContactSubmissions } = require('../controllers/contactController');
const { validateContact } = require('../validators/contactValidator');
const auth = require('../middleware/authMiddleware');

router.get('/', getAllContactSubmissions);
router.post('/', validateContact, submitContactForm);

module.exports = router;