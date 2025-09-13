const { check, validationResult } = require('express-validator');

exports.validateContact = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('A valid email is required'),
  check('message').not().isEmpty().withMessage('Message is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];