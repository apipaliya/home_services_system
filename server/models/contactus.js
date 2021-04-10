const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const contactusSchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
        default:""
    },
    subject:{
        type:String,
        default:""
    },
    text:{
        type:String,
        default:""
    },
    done:{
        type:Number,
        default:0
    }
       
})

mongoose.model("ContactUs",contactusSchema)