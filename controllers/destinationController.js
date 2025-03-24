const Destination = require('../models/destination');

// Add Destination (Admin)
const addDestination = async (req, res) => {
  try {
    const { name, description, price, location, imageUrl } = req.body;
    const newDestination = new Destination({ name, description, price, location, imageUrl });
    await newDestination.save();
    res.status(201).json({ message: "Destination added successfully!", destination: newDestination });
  } catch (error) {
    res.status(500).json({ message: "Error adding destination", error: error.message });
  }
};

// Get all Destinations (Admin)
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching destinations", error: err.message });
  }
};

// Update Destination (Admin)
const updateDestination = async (req, res) => {
  try {
    const updated = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({ message: "Destination updated!", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating destination", error: err.message });
  }
};

// Delete Destination (Admin)
const deleteDestination = async (req, res) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Destination not found" });
    res.status(200).json({ message: "Destination deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting destination", error: err.message });
  }
};

// Public Route: View Destinations
const publicDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json(destinations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching destinations", error: err.message });
  }
};

//  Export all functions properly
module.exports = {
  addDestination,
  getAllDestinations,
  updateDestination,
  deleteDestination,
  publicDestinations
};
