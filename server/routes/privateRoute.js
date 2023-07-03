const express = require("express");
const router = express.Router();
const privateController = require("../controllers/privateController");
const {protect} = require("../middleware/authMiddleware");

router.route("/").get( protect, privateController.getPrivateData);

module.exports = router;
