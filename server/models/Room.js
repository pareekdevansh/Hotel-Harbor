const mongoose = require("mongoose");
const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maxCount: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    imageUrl: [],
    currentBookings: [],
    roomType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;
