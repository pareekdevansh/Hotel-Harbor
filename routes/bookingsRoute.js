const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

router.put("/bookroom",  bookingsController.bookRoom);

router.post("/getbookigsfromemail", bookingsController.getBookingByEmail);

router.get("/getallbookings", bookingsController.getAllBookings);
module.exports = router;
