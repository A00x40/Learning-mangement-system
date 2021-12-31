const { User } = require('./../models/user.model');
const { Learner } = require('./../models/learner.model');
const { Instructor } = require('./../models/instructor.model');

//
exports.addLearner = async (newLearner) => {
    let userLearner = await Learner.create(newLearner)
    userLearner = userLearner.toJSON();
    delete userLearner.password ;  
    return userLearner;
}

exports.addInstructor = async (newInstructor) => {
    let userInstructor = await Instructor.create(newInstructor)
    userInstructor = userInstructor.toJSON();
    delete userInstructor.password;  
    return userInstructor;
}

//
exports.getLearnerLogin = async (receivedEmail, receivedPassword) => {
    let info = {
        email: receivedEmail,
        password: receivedPassword
    }
    
    let user = await Learner.findOne(info).exec();
    return user;
}

exports.getInstructorLogin = async (receivedEmail, receivedPassword) => {
    let info = {
        email: receivedEmail,
        password: receivedPassword
    }

    let user = await Instructor.findOne(info).exec();
    return user;
}

//
exports.updateUserProfile = async (userId, updatedInfo) => {
    
    if(updatedInfo.hasOwnProperty("type")) {
        
        let user = await User.findOneAndUpdate(userId, { $set : updatedInfo } , {
            new: true,
        });
        return user
    }
    else {
        let user = await User.findOneAndUpdate( { _id: userId } , updatedInfo, {
            new: true,
            upsert: true
        });
        return user
    }
}

// Admin
exports.getUsers = async () => {
    let users = await User.find({})
    return users
}
