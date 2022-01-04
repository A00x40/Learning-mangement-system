const express = require("express");
const upload = require('../../middleware/activity');
const { courseController } = require("../../controllers");
const catchAsync = require("../../utils/catchAsync");


const router = express.Router();

router.route("/all")
    .get(catchAsync(courseController.getCourses));

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

router.route("/activity/pdf")
.post(upload, catchAsync(courseController.addActivity));

router.route("/activity/video")
.post(catchAsync(courseController.addActivity));

module.exports = router;