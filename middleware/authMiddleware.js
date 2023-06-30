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

    if (!user) {
      console.log("user not found in AuthMiddleware");
      return next(new ErrorResponse("No User Found", 404));
    }

    console.log("found user in db: authMiddleware : ", user);
    console.log("before modifying request object");
    req.user = user;
    console.log("modifying req in protect call ", req.user);
    // console.log("structure of request object after getting userdata : ", JSON.stringify(req)); // this was producing error ? 
    console.log("passing the control from protect call");
    next();
  } catch (error) {
    return next(new ErrorResponse("Please Login First", 401));
  }
};
