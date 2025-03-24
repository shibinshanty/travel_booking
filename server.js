
require('dotenv').config(); 
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')

const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const destinationRoutes = require('./routes/destinationRoute');
const bookingRoute = require('./routes/bookingRoute');
//middlware
app.use(cors())
app.use(express.json())

//DB connection
mongoose.connect(process.env.DB_URL).then(()=>{console.log("DB is connected sucessfully")}
).catch(err=>{console.log("Error Found",err)})

app.get('/',(req,res)=>{
    res.send("hello developer");
})

app.use('/api/users',userRoute)

app.use('/api/admin',adminRoute)

app.use('/api', destinationRoutes);

app.use('/api', bookingRoute);

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{console.log(`example app listening on port ${PORT}`)})
