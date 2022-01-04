const { User } = require('../models/user.model');

// Sign Up
exports.addUser = async (user) => {
    let newuser = await User.create(user);
    newuser = newuser.toJSON();
    delete newuser.password ;

    return newuser;
}

/* Login Info
{
    email: receivedEmail,
    password: receivedPassword
}
*/
exports.getUserLogin = async (info) => {   
    let user = await User.findOne(info).exec();
    return user;
}


// Update Profile
exports.updateUserProfile = async (id, info) => {
    let user = await User.findOneAndUpdate(id, { $set : info } , {
        new: true,
    });
    return user
}

// Get all users
exports.getUsers = async () => {
    let users = await User.find({})
    return users
}

// Role Change
exports.changeUserRole = async (id, type) => {
    let updatedUser = await User.findOneAndUpdate(
        {
            _id: id,
            courses: { $size: 0 } 
        }, 
        {
            type
        },
        {
            new: true
        }
    );
    return updatedUser;
}