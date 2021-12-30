const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.createToken = (id, userType)=>{
    user = {
        _id : id,
        type : userType
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
}
