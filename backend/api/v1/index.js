const express = require('express');

const userRoute = require("./user.route");

/*
import authRoute from "./auth.route";
import quizRoute from "./quiz.route";
import courseRoute from "./course.route";
*/

const router = express.Router();

router.use("/user", userRoute);
/*
router.use("/auth",authRoute);
router.use("/quiz",quizRoute);
router.use("/course", courseRoute);
*/

module.exports = router;