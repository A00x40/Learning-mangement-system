const { courseService } = require('./../services');
const statusMessageError = require("../utils/statusMessageError");
//
exports.createCourse = async (req,res,next) => {
    let course = await courseService.createCourse(req.body.course, req.body.user);
    if(Object.keys(course).length == 0) {
        return next (new statusMessageError(401,"Learner can't create a course"));
    }
    res.status(200).json(course);
}

//
exports.enrollInCourse = async (req,res,next) => {
    let course = await courseService.enrollInCourse(req.body.course, req.body.user);

    if(Object.keys(course).length == 0) {
        return next (new statusMessageError(401,"Course doesn't exist or Instructor tried to enroll"));
    } 
    
    res.status(200).json(course);
}

//
exports.addQAThread  = async (req,res,next) => {
    const question = await courseService.addQAThread(req.body);

    res.status(200).json(question);
}

exports.getQAs = async (req,res,next) => {
    const allQuestions = await courseService.getQAs(req.body.course);

    res.status(200).json(allQuestions);
}

exports.addQAReply = async (req,res,next) => {
    const reply = await courseService.addQAReply(req.body.post, req.body.reply);

    res.status(200).json(reply);
}

exports.updateQAReply = async (req,res,next) => {
    const reply = await courseService.updateQAReply(req.body.reply, req.body.score);

    res.status(200).json(reply);
}

