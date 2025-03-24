const express=require('express')
const router=express.Router()
const {verifyToken}=require('../middleware/authMiddleware')
const {signup,login,getProfile}=require('../controllers/userController')



router.post('/signup',signup)
router.post('/login',login)

router.get('/profile', verifyToken , getProfile)


module.exports=router