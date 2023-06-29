const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/forgortpassword", authController.forgotPassword);

router.post("/resetPassword/:resetToken", authController.resetPassword);

module.exports = router;
