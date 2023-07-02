const Room = require("../../models/Room");
const Booking = require("../../models/Booking");
const ErrorResponse = require("../../utils/errorResponse");
// Get all rooms
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    console.log("printing rooms  ", rooms);

    res.json(rooms);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Create a new room
exports.createRoom = async (req, res, next) => {
  try {
    const room = req.body;
    console.log("Received room data:", room);
    const newRoom = await Room.create(room);
    console.log("Created new room:", newRoom);
    res.json(newRoom);
  } catch (error) {
    console.log("Error occurred:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Update a room
// update works on following fields for now:
// name , maxCount , phoneNumber , email , rentPerDay, roomType , description
// TODO: imgageUrl[]
exports.updateRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    console.log("printing roomId ", roomId);
    const room = req.body;
    console.log("printing room ", room);

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, room, {
      new: true,
    });

    // in bookings update the roomName field
    if (!updatedRoom) {
      return next(new ErrorResponse("Room not found", 404));
    }
    await Booking.updateMany(
      { roomId: roomId },
      { $set: { roomName: room.name } }
    );
    res.json(updatedRoom);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Delete a room
exports.deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return next(new ErrorResponse("Room not found", 404));
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};
