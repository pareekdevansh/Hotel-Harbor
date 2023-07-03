const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/admin/bookingController");
const userController = require("../controllers/admin/userController");
const roomController = require("../controllers/admin/roomController");

// Bookings Routes
router.get("/bookings", bookingController.getAllBookings);
router.post("/bookings", bookingController.createBooking);
router.put("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

// Users Routes
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Rooms Routes
router.get("/rooms", roomController.getAllRooms);
router.post("/rooms", roomController.createRoom);
router.put("/rooms/:id", roomController.updateRoom);
router.delete("/rooms/:id", roomController.deleteRoom);

module.exports = router;
