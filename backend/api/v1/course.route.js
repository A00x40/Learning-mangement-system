const express = require("express");
const { courseController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");

//import { authenticate } from "../../midllewares/auth";

const router = express.Router();

// Create Course
router.route("/create")
    .post(catchAsync(courseController.createCourse));

router.route("/enroll")
    .post(catchAsync(courseController.enrollInCourse));

router.route("/qa/post")
.post(catchAsync(courseController.addQuestionThread));

router.route("/:id/qa/all")
    .get(catchAsync(courseController.getQuestions));

router.route("/qa/reply")
.post(catchAsync(courseController.addAnswer));

router.route("/qa/update")
.post(catchAsync(courseController.updateQAReply));

module.exports = router;