const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Booked",
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;
