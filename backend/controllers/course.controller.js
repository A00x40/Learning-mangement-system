const { courseService } = require('./../services');
const statusMessageError = require("../utils/statusMessageError");

exports.createCourse = async (req,res,next) => {
    if(req.body.user.type == 0){
        return next (new statusMessageError(403, "You do not have the permission to perform this action"));
    }

    let course = await courseService.createCourse(req.body.course, req.body.user);
    res.status(200).json(course);
}

exports.enrollInCourse = async (req,res,next) => {
    if(req.body.user.type == 1){
        return next (new statusMessageError(403, "You do not have the permission to perform this action"));
    }

    if(req.body.user.courses.includes(req.body.course._id)){
        return next (new statusMessageError(400, "User already enrolled"));
    }

    let course = await courseService.enrollInCourse(req.body.course, req.body.user);
    if(!course) {
        return next (new statusMessageError(400, "Invalid Course Id"));
    } 
    
    res.status(200).json(course);
}

exports.addQuestionThread  = async (req,res,next) => {
    const question = await courseService.addQuestionThread(req.body);
    if(!question) {
        return next (new statusMessageError(400, "Invalid Course Id"));
    } 

    res.status(200).json(question);
}

exports.getQuestions = async (req,res,next) => {
    const allQuestions = await courseService.getQuestions(req.params.id);
    if(!allQuestions) {
        return next (new statusMessageError(400, "Invalid Course Id"));
    } 
    res.status(200).json(allQuestions);
}

exports.addAnswer = async (req,res,next) => {
    const reply = await courseService.addAnswer(req.body.question, req.body.reply);

    res.status(200).json(reply);
}

exports.getAnswers = async (req,res,next) => {
    const reply = await courseService.getAnswers(req.body.question);

    res.status(200).json(reply);
}

exports.addActivity = async (req,res,next) => {
    const path = req.body.file.path.replace(/\\/g, "/");
    // Video Link
    if(Object.keys(req.body.file) == 2) {
        let activity = await courseService.addActivity(req.body.course, 
            {
                filename: req.body.file.originalname,
                path
            }
        );
        res.status(200).json(activity);
    } else {
        let activity = await courseService.addActivity(req.body.course, 
            {
                filename: req.body.file.originalname,
                path: null
            }
        );
        res.status(200).json(activity);
    }
}