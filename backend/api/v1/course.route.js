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

//
router.route("/qa/post")
.post(catchAsync(courseController.addQAThread));

//
router.route("/qa/getall")
    .get(catchAsync(courseController.getQAs));

//
router.route("/qa/reply")
.post(catchAsync(courseController.addQAReply));

//
router.route("/qa/update")
.post(catchAsync(courseController.updateQAReply));
    
module.exports = router;