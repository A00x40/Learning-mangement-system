const { User } = require('./backend/models/user.model');

const startScript = async () => {
    User.create(
        {
            "username": "admin1",
            "email": "admin1@google.com",
            "password": "admin1password",
            "firstname": "admin1",
            "lastname": "admin1",
            "birthdate": "01/01/1990",
            "type": 2
        } ,
        {
            "username": "Ahmed",
            "email": "A00x401@google.com",
            "password": "123456789",
            "firstname": "Ahmed",
            "lastname": "Attia",
            "birthdate": "01/01/1999",
            "type": 0
        } ,
        {
            "username": "Ali",
            "email": "Ali@google.com",
            "password": "123456789",
            "firstname": "Ebrahim",
            "lastname": "Mohamed",
            "birthdate": "01/01/1996",
            "type": 1
        }
    );
}

module.exports = startScript