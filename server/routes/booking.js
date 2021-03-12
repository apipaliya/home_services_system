const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserPro = mongoose.model("UserPro");
const Admin = mongoose.model("Admin");
const Booking = mongoose.model("Booking");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const adminrequireLogin = require("../middleware/adminrequireLogin");
const userrequireLogin = require("../middleware/userrequireLogin");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API, EMAIL } = require("../config/keys");


router.post('/createBooking',userrequireLogin,(req,res)=>{
    const {dateTime,address} = req.body 
    if(!dateTime ||  !address){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    const post = new Booking({
        dateTime,
        address,
        bookedBy:req.user
    })
    post.save().then(result=>{
        console.log(result);
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get("/userData", userrequireLogin, (req, res) => {
    var arr1 = [];
    var _id = req.user._id;
    User.findById(_id)
      .then((users) => {
          console.log(users);
        arr1.push(users.mobile);        
        res.json(arr1);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

module.exports = router;