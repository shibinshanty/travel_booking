

const express = require('express');
const router = express.Router();
const {addDestination,getAllDestinations,updateDestination,deleteDestination,publicDestinations}=require('../controllers/destinationController')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Admin routes (Protected)
router.post('/admin/destinations',verifyToken,verifyAdmin,addDestination);
router.get('/admin/destinations', verifyToken, verifyAdmin,getAllDestinations);
router.put('/admin/destinations/:id', verifyToken, verifyAdmin,updateDestination);
router.delete('/admin/destinations/:id', verifyToken, verifyAdmin,deleteDestination);

// Public route
router.get('/destinations',publicDestinations);

module.exports = router;
