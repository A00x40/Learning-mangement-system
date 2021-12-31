const { courseService } = require('./../services');
const statusMessageError = require("../utils/statusMessageError");
//
exports.createCourse = async (req,res,next) => {
    const course = await courseService.createCourse(req.body.course, req.body.user);
    res.status(200).json(course);
}

//
exports.enrollInCourse = async (req,res,next) => {
    const course = await courseService.enrollInCourse(req.body.course, req.body.user);

    if(course.hasOwnProperty("duplicate"))
        return next (new statusMessageError(422,"Duplicate Enroll"));
    res.status(200).json(course);
}
