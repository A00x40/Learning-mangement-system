const express = require("express");
const { userController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");

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
router.route("/role")
    .post(catchAsync(userController.changeUserRole));


// Update Profile
router.route("/update")
    .post(catchAsync(userController.updateUserProfile));

// Get User Courses
router.route("/:id/courses")
    .get(catchAsync(userController.getUserCourses));

module.exports = router;