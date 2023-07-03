const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.put("/bookroom",  bookingController.bookRoom);

router.post("/getbookigsfromemail", bookingController.getBookingByEmail);

router.get("/getallbookings", bookingController.getAllBookings);
module.exports = router;
