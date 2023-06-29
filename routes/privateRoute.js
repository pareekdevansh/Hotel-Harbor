const express = require("express");
const router = express.Router();
const privateController = require("../controllers/privateController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/").get(authMiddleware.protect, privateController.getPrivateData);

module.exports = router;
