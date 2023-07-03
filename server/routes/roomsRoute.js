const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");


router.get("/getallrooms", roomController.getAllRooms);
router.post("/getroombyid", roomController.getRoomById);

module.exports = router;