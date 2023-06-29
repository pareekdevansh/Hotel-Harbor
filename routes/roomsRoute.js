const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");


router.get("/getallrooms", roomsController.getAllRooms);
router.post("/getroombyid", roomsController.getRoomById);

module.exports = router;