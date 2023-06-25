const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
router.post("/bookroom", async (req, res) => {
  const { roomId, userId, checkInDate, checkOutDate } = req.body;
  try {
    const newBooking = new Booking({
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      transactionId: "123",
    });
    const booking = await newBooking.save();
    const room = await Room.findOne({ _id: booking.roomId });
    room.currentBookings.push({
      userId: userId,
      bookingId: booking._id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      status: booking.status,
    });
    await room.save();
    res.send(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
