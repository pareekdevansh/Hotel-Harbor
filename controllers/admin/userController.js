const User = require("../../models/User");
const ErrorResponse = require("../../utils/errorResponse");

// @desc    Get all users
// @route   GET /api-admin/users
// @access  Public
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// @desc    Create a new user
// @route   POST /api-admin/users
// @access  Public
exports.createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// @desc    Update a user
// @route   PUT /api-admin/users/:id
// @access  Public
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.json(updatedUser);
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 500));
  }
};

// @desc    Delete a user by id
// @route   DELETE /api-admin/users/:id
// @access  Public
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    return next(new ErrorResponse("Internal server error", 500));
  }
};
