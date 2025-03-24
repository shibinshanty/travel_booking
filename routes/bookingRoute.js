const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { createBooking, getUserBookings } = require('../controllers/bookingController');

// User must be logged in
router.post('/bookings', verifyToken, createBooking);
router.get('/bookings', verifyToken, getUserBookings);

module.exports = router;
