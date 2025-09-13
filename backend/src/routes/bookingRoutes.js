const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, findBookingsByPhone, getBookingStatsByCity, getBookingStatsByLocality, updateBookingStatus, deleteBooking, editBooking } = require('../controllers/bookingController');
const { validateBooking } = require('../validators/bookingValidator');
const auth = require('../middleware/authMiddleware');

router.get('/stats/by-city', auth, getBookingStatsByCity);
router.get('/stats/by-locality', auth, getBookingStatsByLocality);
router.get('/search', findBookingsByPhone);
router.get('/', auth, getAllBookings);
router.put('/:id', auth, editBooking);
router.post('/', validateBooking, createBooking);
router.put('/:id/status', auth, updateBookingStatus);
router.delete('/:id', auth, deleteBooking);

module.exports = router;