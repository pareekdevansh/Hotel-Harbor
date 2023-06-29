require("dotenv").config();
import User from "../models/User";

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findOne({ _id: id });
    const userPublicDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    res.send(userPublicDetails);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
