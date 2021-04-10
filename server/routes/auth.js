const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const UserPro = mongoose.model("UserPro");
const Admin = mongoose.model("Admin");
const ContactUs = mongoose.model("ContactUs");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const adminrequireLogin = require("../middleware/adminrequireLogin");
const userrequireLogin = require("../middleware/userrequireLogin");
const nodemailer = require("nodemailer");
const { Router } = require("express");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "helpinghandsmongo@gmail.com",
    pass: "Helping@hands",
  },
});

router.post("/signup", (req, res) => {
  const { name, email, password, state, city, mobile } = req.body;
  if (!email || !password || !name || !state || !city) {
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
          mobile,
          state,
          city,
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
    console.log(savedUser);
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        console.log(doMatch);
        if (doMatch && savedUser.valid == 1) {
          //    res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, profession, address, valid } = savedUser;
          res.json({
            token,
            user: { _id, name, email, profession, address, valid },
          });
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
      arr1.push(userpros.rating);
      res.json(arr1);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updatecharge", requireLogin, (req, res) => {
  const { charge } = req.body;
  const _id = req.userPro._id;
  if (!charge) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  UserPro.findOneAndUpdate(
    { _id },
    {
      $set: {
        charge,
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
  console.log("----------------");
  console.log(available);
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
      console.log(data);
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

router.get("/carpenterPro", userrequireLogin, (req, res) => {
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  UserPro.find({ available: true, valid: 1, profession: "Carpenter" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/pestcontrolPro", userrequireLogin, (req, res) => {
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  UserPro.find({ available: true, valid: 1, profession: "Pest Control" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/plumberPro", userrequireLogin, (req, res) => {
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  UserPro.find({ available: true, valid: 1, profession: "Plumber" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/electricianPro", userrequireLogin, (req, res) => {
  if (!req.user) {
    return res.status(422).json({ error: "required login" });
  }
  UserPro.find({ available: true, valid: 1, profession: "Electrician" })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/verifyProfessional", adminrequireLogin, (req, res) => {
  if (!req.admin) {
    return res.status(422).json({ error: "required login" });
  }
  UserPro.find({ valid: 0 })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/user/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User don't exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        const mailOptions = {
          from: "helpinghandsmongo@gmail.com",
          to: `${req.body.email}`,
          subject: "password reset",
          html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/user/reset/${token}">link</a> to reset password</h5>
                    `,
        };
        transporter.sendMail(mailOptions, function (err, res) {
          if (err) {
            console.error("there was an error: ", err);
          } else {
            console.log("here is the res: ", res);
          }
        });
        res.json("mail send successfully");
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/user/new-password", (req, res) => {
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

router.post("/userpro/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    UserPro.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User don't exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        const mailOptions = {
          from: "helpinghandsmongo@gmail.com",
          to: `${req.body.email}`,
          subject: "password reset",
          html: `
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/userpro/reset/${token}">link</a> to reset password</h5>
                    `,
        };
        transporter.sendMail(mailOptions, function (err, res) {
          if (err) {
            console.error("there was an error: ", err);
          } else {
            console.log("here is the res: ", res);
          }
        });
        res.json("mail send successfully");
        res.json({ message: "check your email" });
      });
    });
  });
});

router.post("/userpro/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  UserPro.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((userPro) => {
      if (!userPro) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then((hashedpassword) => {
        userPro.password = hashedpassword;
        userPro.resetToken = undefined;
        userPro.expireToken = undefined;
        userPro.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/contactDone", adminrequireLogin, (req, res) => {
  const { email } = req.body;
  console.log(email);

  ContactUs.findOneAndUpdate(
    { email },
    { $set: { done: 1 } },
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

router.get("/contactRemaining", adminrequireLogin, (req, res) => {
  if (!req.admin) {
    return res.status(422).json({ error: "required login" });
  }
  ContactUs.find({ done: 0 })
    .then((userpros) => {
      res.json(userpros);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/contactusdata", (req, res) => {
  const { name, email, subject, text } = req.body;
  if (!name || !email || !subject || !text) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }

  const post = new ContactUs({
    name,
    email,
    subject,
    text,
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

module.exports = router;
