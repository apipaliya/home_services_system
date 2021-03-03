const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const nodemailer = require("nodemailer");
const { Router } = require("express");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "helpinghandsmongo@gmail.com",
    pass: "Helping@hands",
  },
});

router.post("/add", function (req, res) {
  const mailOptions = {
    from: "helpinghandsmongo@gmail.com",
    to: `${req.body.email}`,
    subject: "Account verification",
    text:
      "Congratulations, Your Account is verified by Helping Hands At Home. Now you can use our system.",
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
  res.json("mail send successfully");
});

router.post("/delete", function (req, res) {
  const mailOptions = {
    from: "helpinghandsmongo@gmail.com",
    to: `${req.body.email}`,
    subject: "Account verification",
    text:
      "Thank you for taking the time to consider Helping Hands At Home. We wanted to let you know that we have chosen to move forward with a different candidate for the that position.Our team was impressed by your skills and accomplishments. We think you could be a good fit for other future openings and will reach out again if we find a good match.We wish you all the best in your job search and future professional endeavors.",
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
  res.json("mail send successfully");
});

module.exports = router;
