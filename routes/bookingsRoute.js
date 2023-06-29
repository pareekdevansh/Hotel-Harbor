const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

router.post("/bookroom", bookingsController.bookRoom);

router.post("/getbookingsbyuserid", bookingsController.getBookingByUserId);

router.get("/getallbookings", bookingsController.getAllBookings);
module.exports = router;
