const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const bookingSchema = new mongoose.Schema({
    dateTime:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    bookedBy:{
        type:ObjectId,
        ref:"User"
    },
    provider:{
        type:ObjectId,
        ref:"UserPro"
    },
    paymentStatus:{
        type:Number,
        default:0
    }
       
})

mongoose.model("Booking",bookingSchema)