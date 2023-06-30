require("dotenv").config();
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/getallusers", userController.getAllUsers);

router.get(
  "/getuserdetails",
  authMiddleware.protect,
  userController.getUserDetails
);
module.exports = router;
