const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    roomName: {
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
      required: true,
      default: "Booked",
    }
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;
