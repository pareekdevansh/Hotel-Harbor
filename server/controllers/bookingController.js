const Room = require("../models/Room");
const Booking = require("../models/Booking");
const User = require("../models/User");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");
exports.bookRoom = async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findOne({
      _id: bookingId,
    });
    if (booking.status === "Booked") {
      return res.status(400).json({ message: "Room is already booked!!" });
    }
    booking.status = "Booked";
    await booking.save();
    console.log("after updating status to Booked: ", booking);
    const room = await Room.findOne({ _id: booking.roomId });
    if (!room) {
      return res.status(400).json({ message: "Room does not exist!!" });
    }
    await room.currentBookings.push({
      bookingId: booking._id,
      userId: booking.userId,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
    });
    await room.save();
    res.send(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBookingByEmail = async (req, res) => {
  try {
    console.log("getting bookings with email : ", req.body.email);
    const user = await User.findOne({ email: req.body.email });
    const bookings = await Booking.find({ userId: user._id });
    res.send(bookings);
  } catch (error) {
    return new ErrorResponse(error.message, 400);
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return new ErrorResponse(error.message, 400);
  }
};
