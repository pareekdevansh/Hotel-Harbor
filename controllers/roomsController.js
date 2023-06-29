const Room = require("../models/Room");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  const roomId = req.body.id;
  try {
    const room = await Room.findOne({ _id: roomId });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
