const Room = require("../../models/Room");
const ErrorResponse = require("../../utils/errorResponse");
// Get all rooms
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Create a new room
exports.createRoom = async (req, res, next) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.json(savedRoom);
  } catch (error) {
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Update a room
exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedRoom) {
      return next(new ErrorResponse("Room not found", 404));
    }
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
