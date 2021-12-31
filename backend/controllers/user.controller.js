const { userService } = require('./../services');
const { authService } = require('./../services');
const statusMessageError = require("../utils/statusMessageError");

// Sign Up
exports.addLearner =  async (req,res,next) => {
    const learner = await userService.addLearner(req.body);
    res.status(200).json(learner);
}

exports.addInstructor =  async (req,res,next) => {
    const instructor = await userService.addInstructor(req.body);
    res.status(200).json(instructor);
}

// Authenticatin
exports.learnerLogin = async (req,res,next)=>{
    loggedUser = await userService.getLearnerLogin(req.body.email,req.body.password);
    if(loggedUser == null){
        return next (new statusMessageError(401,"incorrect username or password or different user type"));
    }

    const myToken = authService.createToken(loggedUser._id);
    res.status(200).json({
        token : myToken,
        user : loggedUser 
    });
};

exports.instructorLogin = async (req,res,next) => {
    loggedUser = await userService.getInstructorLogin(req.body.email, req.body.password);
    if(loggedUser == null){
        return next (new statusMessageError(401,"incorrect username or password or different user type"));
    }

    const myToken = authService.createToken(loggedUser._id);
    res.status(200).json({
        token : myToken,
        user : loggedUser 
    });
};


// User Update Profile
exports.updateUserProfile = async (req,res,next) => {
    updatedUser = await userService.updateUserProfile(req.body.userId, req.body.info);
    res.status(200).json(updatedUser);
};

// Admin Actions
exports.getUsers = async (req,res,next) => {
    allUsers = await userService.getUsers();
    res.status(200).json(allUsers);
};
