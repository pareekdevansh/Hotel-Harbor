const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
  const { roomId, userId, checkInDate, checkOutDate } = req.body;
  try {
    const newBooking = new Booking({
      roomId: roomId,
      userId: userId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
    const booking = await newBooking.save();
    const room = await Room.findOne({ _id: roomId });
    await room.currentBookings.push({
      bookingId: booking._id,
      userId: userId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    });
    await room.save();
    res.send(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.body.userId });
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
