const Booking = require("../../models/Booking");
const Room = require("../../models/Room");
const ErrorResponse = require("../../utils/errorResponse");

// Get all bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    console.log("Retrieved all bookings:", bookings);
    res.json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Create a new booking
exports.createBooking = async (req, res, next) => {
  const booking = req.body;
  console.log("Create booking request:", booking);
  try {
    const newBooking = await Booking.create(booking);
    console.log("Booked room from admin panel:", newBooking);
    // update room's current bookings array
    const room = await Room.findOne({ _id: newBooking.roomId });
    if (!room) {
      // delete booking if room does not exist
      await Booking.deleteOne({ _id: newBooking._id });
      console.error("Room does not exist!");
      throw new ErrorResponse("Room does not exist!", 400);
    }
    room.currentBookings.push({
      bookingId: newBooking._id,
      userId: newBooking.userId,
      checkInDate: newBooking.checkInDate,
      checkOutDate: newBooking.checkOutDate,
    });
    await room.save();
    console.log("Booking created successfully:", newBooking);
    res.send(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    next(new ErrorResponse(error.message, 400));
  }
};

// Update a booking
exports.updateBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      booking,
      { new: true }
    );
    if (!updatedBooking) {
      console.error("Booking not found");
      throw new ErrorResponse("Booking not found", 404);
    }
    const room = await Room.findOne({ _id: roomId });
    if (!room) {
      console.error("Room does not exist");
      throw new ErrorResponse("Room does not exist", 400);
    }
    const bookingIndex = room.currentBookings.findIndex(
      (booking) => booking.bookingId.toString() === bookingId
    );
    if (bookingIndex === -1) {
      console.error("Booking not found in room");
      throw new ErrorResponse("Booking not found in room", 400);
    }
    room.currentBookings[bookingIndex] = {
      bookingId,
      userId,
      checkInDate,
      checkOutDate,
    };
    await room.save();
    console.log("Booking updated successfully:", updatedBooking);
    res.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    let booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      throw new ErrorResponse("Booking not found", 404);
    }
    const roomId = booking.roomId;
    booking = await Booking.deleteOne({ _id: bookingId });
    const room = await Room.findOne({ _id: roomId });
    if (!room) {
      console.error("Room does not exist");
      throw new ErrorResponse("Room does not exist", 400);
    }
    const bookingIndex = room.currentBookings.findIndex(
      (booking) => booking.bookingId.toString() === bookingId
    );
    if (bookingIndex === -1) {
      console.error("Booking not found in room");
      throw new ErrorResponse("Booking not found in room", 400);
    }
    room.currentBookings.splice(bookingIndex, 1);
    await room.save();
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};
