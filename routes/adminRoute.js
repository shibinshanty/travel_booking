const express = require('express');
const router = express.Router();
const {adminSignup,adminLogin,getAdminProfile,getAdminDashboard} = require('../controllers/adminController');
const {verifyToken} = require('../middleware/authMiddleware');

// Admin Signup
router.post('/signup',adminSignup);

// Admin Login
router.post('/login',adminLogin);

//  Admin Protected Profile Route
router.get('/profile', verifyToken,getAdminProfile);

// Admin dashboard Route
router.get('/dashboard', verifyToken, getAdminDashboard);

module.exports = router;
