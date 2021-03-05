const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserPro = mongoose.model("UserPro");
const Admin = mongoose.model("Admin");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const adminrequireLogin = require("../middleware/adminrequireLogin");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { SENDGRID_API, EMAIL } = require("../config/keys");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

router.post("/signup", (req, res) => {
  const { name, email, password, state, city, address } = req.body;
  if (!email || !password || !name || !state || !city || !address) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          name,
          email,
          password: hashedpassword,
          state,
          city,
          address,
        });

        user
          .save()
          .then((user) => {
            // transporter.sendMail({
            //     to:user.email,
            //     from:"no-reply@helpinghands.com",
            //     subject:"signup success",
            //     html:"<h1>welcome to helpinghandsgram</h1>"
            // })
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //    res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, address } = savedUser;
          res.json({ token, user: { _id, name, email, address } });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/adminLogin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  Admin.findOne({ email: email }).then((savedUser) => {
    console.log(savedUser);
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    console.log(savedUser.password);
    console.log(password);
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //    res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, email } = savedUser;
          res.json({ token, user: { _id, email } });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/signuppro", (req, res) => {
  const {
    name,
    email,
    password,
    profession,
    mobile,
    zipcode,
    city,
    address,
  } = req.body;
  if (
    !email ||
    !password ||
    !name ||
    !mobile ||
    !zipcode ||
    !city ||
    !address ||
    !profession
  ) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  UserPro.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new UserPro({
          name,
          email,
          password: hashedpassword,
          profession,
          mobile,
          zipcode,
          city,
          address,
        });

        user
          .save()
          .then((user) => {
            // transporter.sendMail({
            //     to:user.email,
            //     from:"no-reply@helpinghands.com",
            //     subject:"signup success",
            //     html:"<h1>welcome to helpinghandsgram</h1>"
            // })
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/loginpro", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  UserPro.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          //    res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, profession, address } = savedUser;
          res.json({ token, user: { _id, name, email, profession, address } });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/profilepro", requireLogin, (req, res) => {
  const { image } = req.body;
  const _id = req.userPro._id;
  console.log(image, _id);
  if (!image) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  UserPro.findOneAndUpdate(
    { _id },
    {
      $set: {
        image,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/verificationSuccess", adminrequireLogin, (req, res) => {
  const { email } = req.body;
  console.log(email);
  UserPro.findOneAndUpdate(
    { email },
    { $set: { valid: 1 } },
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

router.post("/verificationCancel", adminrequireLogin, (req, res) => {
  const { email } = req.body;
  console.log(email);
  UserPro.findOneAndDelete({ email }, (err, doc) => {
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

router.get("/profilepro", requireLogin, (req, res) => {
  var _id = req.userPro._id;
  UserPro.findById(_id)
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/charge", requireLogin, (req, res) => {
  var arr1 = [];
  var _id = req.userPro._id;
  UserPro.findById(_id)
    .then((userpros) => {
      arr1.push(userpros.charge);
      arr1.push(userpros.available);
      arr1.push(userpros.name);
      arr1.push(userpros.image);
      arr1.push(userpros.address);
      res.json(arr1);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updatecharge", requireLogin, (req, res) => {
  const { charge } = req.body;
  const { available } = req.body;
  const _id = req.userPro._id;
  if (!charge) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  UserPro.findOneAndUpdate(
    { _id },
    {
      $set: {
        charge,
        available,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateAvailable", requireLogin, (req, res) => {
  const { available } = req.body;
  const _id = req.userPro._id;
  UserPro.findOneAndUpdate(
    { _id },
    {
      $set: {
        available,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/professionals", requireLogin, (req, res) => {
  UserPro.find({ available: true, valid: 1 })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/carpenterPro", (req, res) => {
  UserPro.find({ available: true, valid: 1, profession: "Carpenter" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/pestcontrolPro", (req, res) => {
  UserPro.find({ available: true, valid: 1, profession: "Pest Control" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/plumberPro", (req, res) => {
  UserPro.find({ available: true, valid: 1, profession: "Plumber" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/electricianPro", (req, res) => {
  UserPro.find({ available: true, valid: 1, profession: "Electrician" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/verifyProfessional", adminrequireLogin, (req, res) => {
  UserPro.find({ valid: 0 })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "no-replay@insta.com",
          subject: "password reset",
          html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
