require("dotenv").config();
const jwt = require("jsonwebtoken");
const genAuthToken = (user) => {
  const secret_key = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY
    // {
    //   expiresIn: process.env.JWT_EXPIRE,
    // }
  );
  return token;
};
module.exports = genAuthToken;
