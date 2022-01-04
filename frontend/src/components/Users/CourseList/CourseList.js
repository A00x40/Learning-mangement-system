// import CourseCard from '../CourseCard/CourseCard'
// import PlusCard from '../PlusCard/PlusCard'
import styles from './CourseList.module.css'
// import {useState, useEffect} from 'react'
// import {useSelector, useDispatch} from 'react-redux';
// import {fetchAllCourses, enrollIntoCourse, createCourse, returnCreateEnrollToIdle, selectAllCourses} from '../../../Store/CoursesSlice'
// import {STATUS_IDLE, STATUS_LOADING, STATUS_SUCCEEDED, STATUS_FAILED, LINK_CREATE, ENROLL, CREATE} from '../../../Constants'
// import {Link} from 'react-router-dom'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE, ENROLL, STATUS_FAILED, STATUS_LOADING, STATUS_SUCCEEDED } from "../../../Constants";
import CourseCard from '../CourseCard/CourseCard';
import PlusCard from '../PlusCard/PlusCard';
import { createCourse, fetchAllCourses, returnCreateEnrollToIdle, selectAllCourses } from '../../../store/CoursesSlice';

const CourseList = ({userLink, createEnrollText/*, createEnrollLink*/}) => {
    const courses = useSelector(selectAllCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log("onMount");
        if (courses.status !== STATUS_SUCCEEDED) {
            dispatch(fetchAllCourses());
        }
    }, []);

    const [isCreateEnroll, setIsCreateEnroll] = useState(false);

    const createEnrollCardClickHandler = (event) => {
        dispatch(returnCreateEnrollToIdle());
        setIsCreateEnroll(true);
    }
    
    const overlayClickHandler = (event) => {
        setIsCreateEnroll(false);
    }

    const [courseKeyInput, setCourseKeyInput] = useState('');
    const courseKeyInputChangeHandler = (event) => setCourseKeyInput(event.target.value);

    const enrollSubmitHandler = (event) => {
        event.preventDefault();
        let params = {name:courseKeyInput};
        dispatch(createCourse(params));
        // if (createEnrollText === ENROLL) {
        //     params = {courseKey:courseKeyInput};
        //     dispatch(enrollIntoCourse(params));
        // } else {
        //     params = {name:courseKeyInput};
        //     dispatch(createCourse(params));
        // }
    }

    if (isCreateEnroll && courses.createEnroll.status === STATUS_SUCCEEDED) {
        setCourseKeyInput('');
        setIsCreateEnroll(false);
    }

    return (
        <div className={styles.course_list}>
            {courses.status === STATUS_LOADING && <p className='font2 bold'>Loading...</p>}
            {
                courses.status === STATUS_SUCCEEDED &&
                courses.courses.map(
                    course => (
                        <CourseCard
                            key={course.id}
                            courseId={course.id}
                            coverImgSrc={course.imgUrl}
                            courseTitle={course.name}
                            instructorImgSrc={course.user.imgUrl}
                            instructorName={course.user.name}
                            userLink={userLink}
                        />
                    )
                )
            }
            
            <div className="course_card">
                <PlusCard  text={createEnrollText}  clickHandler={createEnrollCardClickHandler}/>
            </div>
            
            {isCreateEnroll && 
                <div className={styles.overlay} onClick={overlayClickHandler}/>
            }
            {isCreateEnroll && 

                <form onSubmit={enrollSubmitHandler} className={styles.enroll_form}>
                    {/* {createEnrollText === ENROLL && <label htmlFor="course_key" className="font2 bold">Enter Course Key</label>} */}
                    {createEnrollText === CREATE && <label htmlFor="course_key" className="font2_white bold">Enter Course Name</label>}
                    <input type="text" id="course_key" name="course_key" 
                            className={`${styles.input_text} remove_user_agent_stylesheet font2`} 
                            value={courseKeyInput} onChange={courseKeyInputChangeHandler} required/>
                    
                    <div className={styles.enroll_button_parent_div}>
                        {/*<div className={styles.enroll_button_spacer}/>*/}
                        <p className='font2_white bold red flex1'>{courses.createEnroll.status === STATUS_FAILED && courses.createEnroll.error.message}</p>
                        <button className="input_button" type="submit">{createEnrollText}</button>
                    </div>
                </form>
            }
        </div>
        // <div>Course List</div>
    );
}
 
export default CourseList;