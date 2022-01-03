const express = require('express');

const userRoute = require("./user.route");
//const courseRoute = require("./course.route");
//const quizRoute = require("./quiz.route");


const router = express.Router();

router.use("/user", userRoute);
//router.use("/course", courseRoute)
//router.use("/quiz",quizRoute);


module.exports = router;