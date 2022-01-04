const { userService } = require('./../services');
const { authService } = require('./../services');
const statusMessageError = require("../utils/statusMessageError");

// Sign Up
exports.addUser =  async (req,res,next) => {
    const user = await userService.addUser(req.body);
    res.status(200).json(user);
}

// Authenticatin
exports.getUserLogin = async (req,res,next)=>{
    loggedUser = await userService.getUserLogin(req.body.info);
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
    let updatedUser = await userService.updateUserProfile(req.params.id, req.body.info);
    if(Object.keys(updatedUser).length === 0) {
        return next (new statusMessageError(401,"only admins can change roles"));
    }
    res.status(200).json(updatedUser);
};

// Get Users
exports.getUsers = async (req,res,next) => {
    allUsers = await userService.getUsers();
    res.status(200).json(allUsers);
};

// User Update Profile
exports.changeUserRole = async (req,res,next) => {
    let updatedUser = await userService.changeUserRole(req.params.id, req.body.id, req.body.key);
    
    if(updatedUser == null) {
        return next (new statusMessageError(401,"user has courses so he can't be upgraded"));
    }
    else if(Object.keys(updatedUser) == 0) {
        return next (new statusMessageError(401,"role update request not made by an admin"));
    }
    res.status(200).json(updatedUser);
};
