const { Course } = require("../models/course.model");
const { Instructor } = require("../models/instructor.model");
const { Learner } = require("../models/learner.model");

// Add Course to instructor created or to learner enrolled courses
updateUserCourses = async (user, course) => {
    if(user.type === "Instructor") {
        let ownedCourses = user.ownedCourses ? user.ownedCourses : [] ;

        ownedCourses.push(course);
        await Instructor.findOneAndUpdate({_id: user._id}, { ownedCourses });
    }
    else {
        let courses = user.courses ? user.courses : [] ;

        courses.push(course);
        await Learner.findOneAndUpdate({_id: user._id}, { courses });
    }
}

// Instructor create course
exports.createCourse = async(newCourse, user) => {
    let course = await Course.create(newCourse);
    
    course = course.toJSON();
    await updateUserCourses(user, course);
    return course;
};

exports.enrollInCourse = async (course, user) => {    
    let updatedCourse = await Course.findById({ _id: course._id});
    
    let scores = updatedCourse.scores ? updatedCourse.scores : [];
    for(let score of scores) {
        if(score.learner == user._id) return { "duplicate": true }
    };

    scores.push({
        "learner": user._id
    })
    updatedCourse = await Course.findByIdAndUpdate({ _id: course._id}, { scores } , {
        new: true
    });

    await updateUserCourses(user, updatedCourse);
    return updatedCourse
};

