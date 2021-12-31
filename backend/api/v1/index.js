const express = require('express');

const userRoute = require("./user.route");
const courseRoute = require("./course.route");

/*
import authRoute from "./auth.route";
import quizRoute from "./quiz.route";
*/

const router = express.Router();

router.use("/user", userRoute);
router.use("/course", courseRoute)
/*
router.use("/auth",authRoute);
router.use("/quiz",quizRoute);
;
*/

module.exports = router;