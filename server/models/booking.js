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
    zipcode:{
        type:Number,
        default:0
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
    },
    visit:{
        type:Number,
        default:0
    },
    confirm:{
        type:Number,
        default:0
    },
    payamount:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:""
    }
       
})

mongoose.model("Booking",bookingSchema)