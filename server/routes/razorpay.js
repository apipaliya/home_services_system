var express = require("express");
var router = express.Router();

const Razorpay = require("razorpay");
const request = require("request");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserPro = mongoose.model("UserPro");
const Booking = mongoose.model("Booking");
const paymentlog = mongoose.model("paymentlog");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const adminrequireLogin = require("../middleware/adminrequireLogin");
const userrequireLogin = require("../middleware/userrequireLogin");
//ngrok.exe http 8000
const razorInstance = new Razorpay({
  key_id: keys.razorIdkey,
  key_secret: keys.razorIdSecret,
});

router.post("/order", async (req, res) => {
  var info = req.body.Amount;
  var amt = parseInt(info, 10);
  var _id = req.body.consid;
  try {
    const options = {
      amount: amt * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0, //1
    };
    razorInstance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something error!s",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something error!s",
    });
  }
});

router.post("/capture/:paymentId", (req, res) => {
  var info = req.body.Amount;
  var amt = parseInt(info, 10);
  try {
    return request(
      {
        method: "POST",
        url: `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: amt * 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something error!s",
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/verification", async (req, res) => {
  const secret = "ajaypatel";
  console.log("Verification");
  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {

    const { payload } = req.body;
    const { payment } = payload;
    const { entity } = payment;
    var pid = entity.id;
    var amo = entity.amount;
    var bookingid = entity.description;
    var oid = entity.order_id;
    amo = amo / 100;
    
    var provider;
    var providerEmail;
    var bookedBy;
    var bookedByEmail;
    await Booking
      .findOneAndUpdate(
        { _id: bookingid },
        {
          $set: {
            payamount: amo,
            paymentStatus: 1,
            visit:1
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          } else {
          }
        }
      )
      .then(async (cons) => {
       // console.log(cons);
       provider = cons.provider
       bookedBy = cons.bookedBy
       await UserPro
       .findById(provider)
       .then((data1)=>{
         providerEmail = data1.email;
       })
       .catch((err)=>console.log(err))
 
       await User
       .findById(bookedBy)
       .then((data1)=>{
         bookedByEmail = data1.email;
       })
       .catch((err)=>console.log(err))
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Something error!",
        });
      });

    var d = new Date().toLocaleString(undefined, { timeZone: "Asia/Kolkata" });

    const newlog = new paymentlog({
      bookingid,
      paymentid: pid,
      Amount: amo,
      paymentstatus: 1,
      order_id: oid,
      date: d,
      senderemail:bookedByEmail,
      receiveremail:providerEmail
    });
    await newlog
      .save()
      .then((nlog) => {
        console.log(nlog);
        res.json({ status: "ok" });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // pass it
    res.json({ status: "ok" });
  }
  
});

router.post("/paymentfailed", async (req, res) => {
  const secret = "ajaypatel";
  console.log("payment failed");
  const crypto = require("crypto");
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {

    const { payload } = req.body;
    const { payment } = payload;
    const { entity } = payment;
    var pid = entity.id;
    var amo = entity.amount;
    var bookingid = entity.description;
    var oid = entity.order_id;
    amo = amo / 100;
    
    var provider;
    var providerEmail;
    var bookedBy;
    var bookedByEmail;
    await Booking
      .findOneAndUpdate(
        { _id: bookingid },
        { $set: {  payamount: 0, paymentStatus: 0 } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
            res.json()
          } else {
          }
        }
      )
      .then(async (cons) => {
        console.log(cons);
        provider = cons.provider
       bookedBy = cons.bookedBy
       await UserPro
       .findById(provider)
       .then((data1)=>{
         providerEmail = data1.email;
       })
       .catch((err)=>console.log(err))
 
       await User
       .findById(bookedBy)
       .then((data1)=>{
         bookedByEmail = data1.email;
       })
       .catch((err)=>console.log(err))
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Something error!",
        });
      });
    var d = new Date().toLocaleString(undefined, { timeZone: "Asia/Kolkata" });
   
    const newlog = new paymentlog({
      bookingid,
      paymentid: pid,
      Amount: amo,
      paymentstatus: 0,
      order_id: oid,
      date: d,
      senderemail:bookedByEmail,
      receiveremail:providerEmail
    });
    await newlog
      .save()
      .then((nlog) => {
        console.log(nlog);
        res.json({ status: "ok" });
      })
      .catch((err) => {
        console.log(err);
      });
    res.json({ status: "ok" });
  } else {
    // pass it
    res.json({ status: "ok" });
  }

 
});


router.post("/setDescription", (req, res) => {
  const { bookingid,description } = req.body;
  console.log(bookingid);
  console.log(description);

  Booking
    .findOneAndUpdate(
      { _id: bookingid },
      { $set: { description:description }},
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        } else {
          res.status(200).json(doc);
        }
      }
    )
    .then((cons) => {
      console.log(cons);
    })
    .catch((err) => console.log(err));
});
module.exports = router;