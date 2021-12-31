const express = require("express");
const { userController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");

//import { authenticate } from "../../midllewares/auth";

const router = express.Router();

// Sign Up
router.route("/learner/signup")
    .post(catchAsync(userController.addLearner));

router.route("/instructor/signup")
    .post(catchAsync(userController.addInstructor));

// Sign In (Authentication)
router.route("/learner/login")
    .post(catchAsync(userController.learnerLogin));

router.route("/instructor/login")
    .post(catchAsync(userController.instructorLogin));


// Update Profile
router.route("/update")
    .post(catchAsync(userController.updateUserProfile));

// Admin Actions
router.route("/getall")
    .get(catchAsync(userController.getUsers));

module.exports = router;