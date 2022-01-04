const { userService } = require('./../services');
const { authService } = require('./../services');
const statusMessageError = require("../utils/statusMessageError");

// Sign Up
exports.addUser =  async (req,res,next) => {
    const user = await userService.addUser(req.body);
    if(!user) {
        return res.status(400).send('That user already exisits!');
    }
    res.status(200).json(user);
}

// Authenticatin
exports.getUserLogin = async (req,res,next)=>{
    let loggedUser = await userService.getUserLogin(req.body.info);
    if(loggedUser == null){
        return next (new statusMessageError(401,"incorrect username or password"));
    }

    const myToken = authService.createToken(loggedUser._id);
    res.status(200).json({
        token : myToken,
        user : loggedUser 
    });
};

// User Update Profile
exports.updateUserProfile = async (req,res,next) => {
    if(req.body.info.hasOwnProperty("type")) {
        return next (new statusMessageError(403, "You do not have the permission to perform this action"));
    };

    let updatedUser = await userService.updateUserProfile(req.params.id, req.body.info);
    res.status(200).json(updatedUser);
};

// Get Users
exports.getUsers = async (req,res,next) => {
    allUsers = await userService.getUsers();
    res.status(200).json(allUsers);
};

// User Update Profile
exports.changeUserRole = async (req,res,next) => {
    if(req.body.user._id == req.body.id || req.body.user.type != 2) {
        return next (new statusMessageError(403, "You do not have the permission to perform this action"));
    }

    let updatedUser = await userService.changeUserRole(req.body.id, req.body.type);
    if(!updatedUser) {
        return next (new statusMessageError(400, "Invalid User Id"));
    }
    
    res.status(200).json(updatedUser);
};
