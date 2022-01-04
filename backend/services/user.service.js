const { User } = require('./../models/user.model');

// Sign Up
exports.addUser = async (user) => {
    let newuser = await User.create(user);
    return newuser.toJSON();
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
    // Users can't update their keys (learner, instructor)
    if(info.hasOwnProperty("type")) return {};
  
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
exports.changeUserRole = async (adminId, id, key) => {

    // Unchanged Role number for admins 
    if(adminId == id) return {}

    // Check the request is made by an admin
    let user = await User.findOne({ _id: adminId }).exec();
    if(user.type != 2) return {}

    let updatedUser = await User.findOneAndUpdate(
        {
            _id: id,
            courses: { $size: 0 } 
        }, 
        {
            key
        },
        {
            new: true
        }
    );
    return updatedUser;
}