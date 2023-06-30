require("dotenv").config();
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/getallusers", usersController.getAllUsers);

router.get(
  "/getuserdetails",
  authMiddleware.protect,
  usersController.getUserDetails
);
module.exports = router;
