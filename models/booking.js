const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true },
  destination: {
    type: mongoose.Schema.Types.ObjectId,ref: 'Destination',required: true},
  bookingDate: {
    type: Date,default: Date.now},
  numberOfPeople: {
    type: Number,required: true},
  totalPrice: {
    type: Number,required: true},
  status: {
    type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], // only these values allowed 
    default: 'Pending'
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
