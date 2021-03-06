const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserPro = mongoose.model("UserPro");
const Admin = mongoose.model("Admin");
const Booking = mongoose.model("Booking");
const paymentlog = mongoose.model("paymentlog");
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

router.post("/createBooking", userrequireLogin, (req, res) => {
  const { dateTime, address, zipcode, professionalsid } = req.body;
  if (!dateTime || !address || !zipcode) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  req.user.password = undefined;
  const post = new Booking({
    dateTime,
    address,
    zipcode,
    bookedBy: req.user,
    provider: professionalsid,
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userData", userrequireLogin, (req, res) => {
  var arr1 = [];
  var _id = req.user._id;
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
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

router.get("/verifywork", requireLogin, (req, res) => {
  var provider = req.userPro._id;
  console.log(provider);
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.userPro) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ provider, confirm: 0 })
    .then(async (data) => {
      console.log(data);
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
          zipcode: data[i].zipcode,
        };
        array1.push(d1);
        var sid = data[i].bookedBy;
        var data1 = await User.findById(sid).exec();
        array.push(data1);
      }

      array2.push(array);
      array2.push(array1);
      res.json(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userpro/todo", requireLogin, (req, res) => {
  var provider = req.userPro._id;
  console.log(provider);
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.userPro) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ provider, confirm: 1, paymentStatus: 0, visit: 0 })
    .then(async (data) => {
      console.log(data);
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
          zipcode: data[i].zipcode,
        };
        array1.push(d1);
        var sid = data[i].bookedBy;
        var data1 = await User.findById(sid).exec();
        array.push(data1);
      }

      array2.push(array);
      array2.push(array1);
      res.json(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userPro/workDone", requireLogin, (req, res) => {
  var provider = req.userPro._id;
  console.log(provider);
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.userPro) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ provider, visit: 1 ,confirm:1,paymentStatus:1})
    .then(async (data) => {
      console.log(data);
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
          zipcode: data[i].zipcode,
          payamount: data[i].payamount,
          description: data[i].description,
          paymentStatus: data[i].paymentStatus,
        };
        array1.push(d1);
        var sid = data[i].bookedBy;
        var data1 = await User.findById(sid).exec();
        array.push(data1);
      }

      array2.push(array);
      array2.push(array1);
      res.json(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/confirmBooking", requireLogin, (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  Booking.findOneAndUpdate(
    { _id },
    { $set: { confirm: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      } else {
        res.status(200).json(doc);
      }
    }
  )
    .then((inf) => {
      // console.log(inf);
    })
    .catch((err) => console.log(err));
});

router.post("/denyBooking", userrequireLogin, (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  Booking.findOneAndDelete({ _id }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    } else {
      res.status(200).json(doc);
    }
  })
    .then((inf) => {
      // console.log(inf);
    })
    .catch((err) => console.log(err));
});

router.get("/userAppointments", userrequireLogin, (req, res) => {
  console.log("userAppointments");
  var bookedBy = req.user._id;
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ bookedBy, paymentStatus: 0, visit: 0, confirm: 1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
        };
        array1.push(d1);
        var sid = data[i].provider;
        var data1 = await UserPro.findById(sid).exec();
        array.push(data1);
      }
      array2.push(array);
      array2.push(array1);
      res.json(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user/transaction", userrequireLogin, (req, res) => {
  console.log("/user/transaction");
  var bookedBy = req.user._id;
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ bookedBy, paymentStatus: 0, visit: 1, confirm: 1 })
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
          payamount: data[i].payamount,
          description: data[i].description
        };
        array1.push(d1);
        var sid = data[i].provider;
        var data1 = await UserPro.findById(sid).exec();
        array.push(data1);
      }
      array2.push(array);
      array2.push(array1);
      res.json(array2);
      console.log(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/visited", requireLogin, (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  Booking.findOneAndUpdate(
    { _id },
    { $set: { visit: 1 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      } else {
        res.status(200).json(doc);
      }
    }
  )
    .then((inf) => {
      // console.log(inf);
    })
    .catch((err) => console.log(err));
});

router.get("/userworkDone", userrequireLogin, (req, res) => {
  console.log("userworkDone");
  var bookedBy = req.user._id;
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ bookedBy, visit: 1, confirm: 1 ,paymentStatus:1})
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
          payamount: data[i].payamount,
          description: data[i].description,
          paymentStatus: data[i].paymentStatus,
        };
        array1.push(d1);
        var sid = data[i].provider;
        var data1 = await UserPro.findById(sid).exec();
        array.push(data1);
      }
      array2.push(array);
      array2.push(array1);
      res.json(array2);
      console.log(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userPro/transaction", requireLogin, (req, res) => {
  var provider = req.userPro._id;
  console.log(provider);
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.userPro) {
    return res.status(422).json({ error: "required login" });
  }
  Booking.find({ provider, confirm: 1, paymentStatus: 0, visit: 1 })
    .then(async (data) => {
      console.log(data);
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          _id: data[i]._id,
          dateTime: data[i].dateTime,
          address: data[i].address,
          zipcode: data[i].zipcode,
          paymentStatus: data[i].paymentStatus
        };
        array1.push(d1);
        var sid = data[i].bookedBy;
        var data1 = await User.findById(sid).exec();
        array.push(data1);
      }

      array2.push(array);
      array2.push(array1);
      res.json(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/transaction", adminrequireLogin, (req, res) => {
  console.log("transaction");
  var array = [];
  var array1 = [];
  var array2 = [];
  if (!req.admin) {
    return res.status(422).json({ error: "required login" });
  }
  paymentlog
    .find()
    .then(async (data) => {
      for (i = 0, len = data.length; i < len; i++) {
        var d1 = {
          paymentid: data[i].paymentid,
          date: data[i].date,
          senderemail: data[i].senderemail,
          receiveremail: data[i].receiveremail,
          bookingid: data[i].bookingid,
          Amount: data[i].Amount,
          paymentstatus: data[i].paymentstatus,
        };
        array1.push(d1);
        var sid = data[i].bookingid;
        var data1 = await Booking.findById(sid).exec();
        array.push(data1);
      }
      array2.push(array);
      array2.push(array1);
      res.json(array2);
      console.log(array2);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/workSuccess", requireLogin, (req, res) => {
  console.log("worksuccess")
  const { _id,payamount,description } = req.body;
  console.log(_id);
  Booking.findOneAndUpdate(
    { _id },
    { $set: { visit: 1, payamount, description, paymentStatus: 0 } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      } else {
        res.status(200).json(doc);
      }
    }
  )
    .then((inf) => {
      // console.log(inf);
    })
    .catch((err) => console.log(err));
});

router.post("/bookingCancel", userrequireLogin, (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  Booking.findOneAndDelete({ _id }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    } else {
      res.status(200).json(doc);
    }
  })
    .then((inf) => {
      // console.log(inf);
    })
    .catch((err) => console.log(err));
});

router.post("/feedbackData", userrequireLogin, async (req, res) => {
  console.log("feedback");
  let { rating, review, professionalsid } = req.body;
  console.log(professionalsid);
  console.log(review);
  console.log(rating);
  if (!rating || !review) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }

  try {
    let userPro = await UserPro.findById(professionalsid);
    // console.log(userPro);
    rating =
      (userPro.rating * userPro.review.length + rating) /
      (userPro.review.length + 1);
    review = [...userPro.review, review];
  } catch (err) {
    console.log(err);
  }
  UserPro.findOneAndUpdate(
    { _id: professionalsid },
    { $set: { review, rating } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      } else {
        res.status(200).json(doc);
      }
    }
  )
    .then((inf) => {
      console.log(inf);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
