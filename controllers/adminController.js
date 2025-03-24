const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Signup
exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await User.findOne({ email, role: "admin" });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin signup successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Admin signup failed.' });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: 'admin' });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // <-- Extended to 7 days
    );

    res.status(200).json({ message: 'Admin Login Successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Admin Profile
exports.getAdminProfile = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Not an Admin!' });
  }

  res.status(200).json({
    message: 'Welcome Admin!',
    adminId: req.user.id,
    email: req.user.email
  });
};

// Admin Dashboard
exports.getAdminDashboard = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Not an Admin!' });
  }
  res.status(200).json({ message: "Welcome to Admin Dashboard" });
};
