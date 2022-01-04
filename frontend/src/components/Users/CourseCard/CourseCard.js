import styles from './CourseCard.module.css'
import {Link} from 'react-router-dom'
import {LINK_COURSE_ANNOUNCEMENTS, LINK_INSTRUCTOR} from '../../../Constants'

const CourseCard = ({courseId, coverImgSrc, instructorImgSrc, courseTitle, instructorName, userLink}) => {
    return (
        // <Link className="course_card" to={`${userLink}${LINK_COURSE_ANNOUNCEMENTS}`.replace(':courseId', courseId)}>
        <Link className="course_card" to={LINK_INSTRUCTOR}>
            
            <img className={styles.course_cover} src={coverImgSrc} alt="Course" />

            <div className={styles.card_content}>
                
                <img className={styles.instructor_img} src={instructorImgSrc} alt="Instructor" />

                <div className={styles.text_content}>
                    <p className='font2_white'>{courseTitle}</p>
                    <div className={styles.text_content_spacer}/>
                    <p className='font2_white'>{instructorName}</p>
                </div>

            </div>
        </Link>
    );
}
 
export default CourseCard;