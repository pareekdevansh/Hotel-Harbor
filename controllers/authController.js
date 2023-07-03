const crypto = require("crypto");
const User = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");
require("dotenv").config();
const sendMail = require("../utils/sendMail");

exports.register = async (req, res, next) => {
  try {
    // validate the data sent using JOI
    const schema = Joi.object({
      name: Joi.string().min(3).max(32).required(),
      email: Joi.string().min(5).max(128).required().email(),
      password: Joi.string().min(6).max(1024).required(),
    });
    const { error } = schema.validate(req.body);
    // BAD REQUEST
    if (error) throw new ErrorResponse(error.details[0].message, 400);

    // validate it's a unique user entry or not
    let user = await User.findOne({ email: req.body.email });
    if (user) throw new ErrorResponse("User already exists", 400);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.send("User Registered Successfully");
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

exports.login = async (req, res, next) => {
  try {
    // validate the data sent using JOI
    const schema = Joi.object({
      email: Joi.string().min(5).max(128).required().email(),
      password: Joi.string().min(6).max(1024).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) throw new ErrorResponse(error.details[0].message, 400);

    // check if user exists or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new ErrorResponse("Invalid Credentials", 401);

    // check if password is correct or not
    const isValidPassword = await user.matchPassword(req.body.password);
    if (!isValidPassword) throw new ErrorResponse("Invalid Credentials", 401);
    console.log("login performed in backend");
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;
  console.log("received email : ", email);

  try {
    const user = await User.findOne({ email: email });
    console.log("found user in db : ", user);
    // we should not tell user that no such email exist in out db
    if (!user) {
      console.log("no such email found in db");
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();
    console.log("generated reset Token: ", resetToken);
    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please click following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      console.log("before calling send mail ");
      await sendMail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      console.log("after calling send mail ");

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  console.log("resetPasswordToken: ", resetPasswordToken);
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log("user with such tokenRequest: ", user);
    if (!user) {
      console.log("no such token found");
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    console.log("new password saved in db");
    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  console.log("token is: ", token);
  res.status(statusCode).json({ success: true, token });
};
