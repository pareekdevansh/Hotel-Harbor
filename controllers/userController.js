require("dotenv").config();
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return new ErrorResponse(error.message, 400);
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    console.log("entered getUserDetails function");
    const user = req.user;
    console.log("user is : ", user);
    let userDetails = {
      name: user.name,
      email: user.email,
    };
    console.log(
      "getUserDetails : user details: ",
      userDetails
    );
    res.send(userDetails);
  } catch (error) {
    return new ErrorResponse(error.message, 400);
  }
};
