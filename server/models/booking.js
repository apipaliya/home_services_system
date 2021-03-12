const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const bookingSchema = new mongoose.Schema({
    dateTime:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bookedBy:{
        type:ObjectId,
        ref:"User"
    }
       
})

mongoose.model("Booking",bookingSchema)