const { check, validationResult } = require('express-validator');

exports.validateBooking = [
  // Validation for Full Name: must not be empty and must contain only letters and spaces
  check('fullName')
    .not().isEmpty().withMessage('Full name is required')
    .isString().withMessage('Full name must be a string')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name can only contain letters and spaces'),

  // Validation for Phone Number: must be a valid Indian number format like +919876543210
  check('phone')
    .not().isEmpty().withMessage('Phone number is required')
    .matches(/^\+91[6-9]\d{9}$/).withMessage('Must be a valid Indian phone number with +91 prefix.'),
  
  // Stricter, optional email validation
  check('email')
    .optional({ checkFalsy: true }) // This makes the field optional
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage('Must be a valid email address'),

  // Other validations
  check('appointmentType').not().isEmpty().withMessage('Appointment type is required'),
  check('paymentMethod').not().isEmpty().withMessage('Payment method is required'),
  check('selectedTests').isArray({ min: 1 }).withMessage('At least one test must be selected'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
