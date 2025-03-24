const Booking = require('../models/booking');
const Destination = require('../models/destination');

// Create a booking
const createBooking = async (req, res) => {
  try {
    const { destinationId, numberOfPeople } = req.body;

    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    const totalPrice = destination.price * numberOfPeople;

    const booking = new Booking({
      user: req.user.id,
      destination: destinationId,
      numberOfPeople,
      totalPrice
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// View user's bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('destination');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

module.exports = { createBooking, getUserBookings };
