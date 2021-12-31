const express = require("express");
const { courseController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");

//import { authenticate } from "../../midllewares/auth";

const router = express.Router();

// Create Course
router.route("/create")
    .post(catchAsync(courseController.createCourse));

//
router.route("/enroll")
    .post(catchAsync(courseController.enrollInCourse));
    
module.exports = router;