require("dotenv").config();
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/getallusers", usersController.getAllUsers);

router.post("/getuserbyid", usersController.getUserById);
