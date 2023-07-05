const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.put("/verifyemail/:verificationToken", authController.verifyEmail);

router.post("/login", authController.login);

router.post("/forgotpassword", authController.forgotPassword);

router.put("/resetPassword/:resetToken", authController.resetPassword);

module.exports = router;
