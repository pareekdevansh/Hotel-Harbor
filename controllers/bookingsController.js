const Room = require("../models/Room");
const Booking = require("../models/Booking");

exports.bookRoom = async (req, res) => {
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
};

exports.getBookingByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.body.userId });
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
