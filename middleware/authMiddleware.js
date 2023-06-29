require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
exports.protect = async (req, res, next) => {
  console.log("checking token");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // format = "Bearer {token}"
    token = req.headers.authorization.split(" ")[1];
    console.log("if condition matching and token is: ", token);
  }

  if (!token) {
    console.log("no token found");
    return next(new ErrorResponse("Please Login First", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded id is : ", decoded);
    const user = await User.findOne({ _id: decoded.id });
    console.log("found user in db : ", user);

    if (!user) return next(new ErrorResponse("No User Found", 404));
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("Please Login First", 401));
  }
};
