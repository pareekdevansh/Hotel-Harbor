const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");
const Booking = require("../../models/Booking");
const Room = require("../../models/Room");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("Retrieved all users:", users);
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  const user = req.body;
  console.log("Create user-creation request:", user);
  try {
    const newUser = await User.create(user);
    console.log("Created user from admin panel:", newUser);
    res.send(newUser);
  } catch (error) {
    console.error("Error creating user: ", error);
    next(new ErrorResponse(error.message, 400));
  }
};

// Update a user
exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = req.body;
    console.log("Update user request:", user);
    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    if (!updatedUser) {
      console.error("User not found");
      throw new ErrorResponse("User not found", 404);
    }
    console.log("Updated user:", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new ErrorResponse("User not found", 404);
    }
    console.log("Deleted user:", deletedUser);

    // Delete all bookings associated with the user
    await Booking.deleteMany({ userId });
    console.log("Deleted bookings associated with the user");

    // Update rooms to remove bookings associated with the user
    await Room.updateMany(
      { "currentBookings.userId": userId },
      { $pull: { currentBookings: { userId } } }
    );
    console.log("Updated rooms to remove bookings associated with the user");

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    next(new ErrorResponse("Internal server error", 500));
  }
};
