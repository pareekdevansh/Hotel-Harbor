const Booking = require("../../models/Booking");
const ErrorResponse = require("../../utils/errorResponse")

// Get all bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Create a new booking
exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.json(savedBooking);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Update a booking
exports.updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBooking) {
      return next(new ErrorResponse("Booking not found", 404));
    }
    res.json(updatedBooking);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Delete a booking
exports.deleteBooking = async (req, res, next) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return next(new ErrorResponse("Booking not found", 404));
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};
