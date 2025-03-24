const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pendingUser=require('../models/pendingUser')
const nodemailer=require('nodemailer')


// Signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const existingPending = await PendingUser.findOne({ email });
        if (existingPending) await PendingUser.deleteOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60000); // 5 mins validity

        const pendingUser = new PendingUser({ name, email, password: hashedPassword, otp, otpExpires });
        await pendingUser.save();

        // Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Registration',
            text: `Your OTP is: ${otp}. Please use it within 5 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP Send ചെയ്തു! Check Email' });

    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// OTP Verify & User Register
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const pendingUser = await PendingUser.findOne({ email });
        if (!pendingUser) return res.status(400).json({ message: 'Pending User ഇല്ല!' });

        if (pendingUser.otp !== otp) return res.status(400).json({ message: 'OTP തെറ്റാണ്!' });

        if (pendingUser.otpExpires < new Date()) {
            await PendingUser.deleteOne({ email });
            return res.status(400).json({ message: 'OTP Expired. Please try again.' });
        }

        const newUser = new User({
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password
        });

        await newUser.save();
        await PendingUser.deleteOne({ email });

        res.status(201).json({ message: 'User Registered Successfully!' });

    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Email or Password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Email or Password' });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Ideally, use env variable!
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login Successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
//Profile
const getProfile = (req, res) => {
    res.status(200).json({ 
      message: `Welcome, ${req.user.email}!`, 
      user: req.user 
    });
  };


  module.exports={signup,login,getProfile}