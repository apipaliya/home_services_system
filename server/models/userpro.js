const mongoose = require('mongoose')
const userproSchema = new mongoose.Schema({
    valid:{
        type:Number,
        default:0
    },
    name:{
        type:String,
        
        default:""
    },
    email:{
        type:String,
        
        default:""
    },  
    password:{
        type:String,
        
        default:""
    },
    profession:{
        type:String,
        
        default:""
    },
    mobile:{
        type:Number,
        default:0
    },
    zipcode:{
        type:Number,
        
        default:""
    },
    city:{
        type:String,
        
        default:""
    },    
    address:{
        type:String,
        
        default:""
    },
    image:{
        type:String,
        default:"https://bootdey.com/img/Content/avatar/avatar7.png"
    },
    available:{
        type:Boolean,
    
    },
    charge:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    review:[{
        type:String,
        
    }],
    resetToken:String,
    expireToken:Date
})

mongoose.model("UserPro",userproSchema) 