const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    const user = await newuser.save();
    const userPublicDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    res.send(userPublicDetails);
    res.send(`User: ${userPublicDetails} Registered Successfully`);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const userPublicDetails = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      res.send(userPublicDetails);
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/getuserbyid", async (req, res) => {
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
});

module.exports = router;
