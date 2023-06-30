const Room = require("../models/Room");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    return new ErrorResponse(error.message, 400);
  }
};

exports.getRoomById = async (req, res) => {
  const roomId = req.body.id;
  try {
    const room = await Room.findOne({ _id: roomId });
    res.send(room);
  } catch (error) {
    return new ErrorResponse(error.message, 400);
  }
};
