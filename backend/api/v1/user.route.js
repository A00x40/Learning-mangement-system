const express = require("express");
const { userController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");

//import { authenticate } from "../../midllewares/auth";

const router = express.Router();

// Sign Up
router.route("/signup")
    .post(catchAsync(userController.addUser));

// Sign In (Authentication)
router.route("/login")
    .post(catchAsync(userController.getUserLogin));

// Update User Profile
router.route("/:id/update")
    .post(catchAsync(userController.updateUserProfile));

// Get all users
router.route("/get")
    .get(catchAsync(userController.getUsers));

// Admin Change User Roles 
router.route("/:id/role")
    .post(catchAsync(userController.changeUserRole));


// Update Profile
router.route("/update")
    .post(catchAsync(userController.updateUserProfile));

module.exports = router;