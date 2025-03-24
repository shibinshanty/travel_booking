const mongoose=require('mongoose')

const destinationSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:String,
    location:String,
    price:{type:Number,required:true},
    image:String
})

module.exports=mongoose.model('Destination',destinationSchema);
