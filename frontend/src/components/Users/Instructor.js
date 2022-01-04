// import AccountMain from "./Components/AcountMain/AccountMain";
// import DummyPlaceholder from "../DummyPlaceholder";
// import CourseList from './Components/CourseList/CourseList'
// import Course from './Components/Course/Course'
// import {
//     LINK_PROFESSOR, 
//     LINK_MESSAGES_OVERVIEW, 
//     LINK_COURSES, 
//     LINK_COMPLAINTS, 
//     LINK_COURSE,
//     LINK_CREATE,
//     CREATE,
//     LINK_PROFESSOR_HOME,
//     MESSAGES_COMPONENT_TYPE_COMPLAITNS,
//     LINK_COMPLAINTS_SENT, 
//     LINK_COMPLAINTS_RECEIVED,
//     LINK_COMPLAINTS_SEND,
//     LINK_COMPLAINTS_VIEW
// } from '../../Constants'
// import {useLocation, Redirect} from 'react-router-dom'
// import Messages from "./Components/Messages/Messages";

import { Navigate, useLocation } from "react-router";
import { CREATE, LINK_COURSE, LINK_COURSES, LINK_EDIT_PROFILE, LINK_INSTRUCTOR } from "../../Constants";
import AccountMain from "./AcountMain/AccountMain";
import Course from "./Course/Course";
import CourseList from "./CourseList/CourseList";
import EditProfile from "./EditProfile/EditProfile";

const Instructor = () => {

    // const complaintsComponent = <Messages
    //                                 userLink={LINK_PROFESSOR} type={MESSAGES_COMPONENT_TYPE_COMPLAITNS} sendMessageShowStudentList={false}
    //                                 subjectAltText="Subject"
    //                                 receivedAltText="Responses"     receivedRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_RECEIVED}   receivedExactPath={true}    receivedLink={LINK_PROFESSOR + LINK_COMPLAINTS_RECEIVED} 
    //                                 sentAltText="Sent"              sentRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_SENT}           sentExactPath={true}        sentLink={LINK_PROFESSOR + LINK_COMPLAINTS_SENT}
    //                                 sendAltText="Send a complaint"  sendRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_SEND}           sendExactPath={true}        sendLink={LINK_PROFESSOR + LINK_COMPLAINTS_SEND}
    //                                 messageViewerRoutePath={LINK_PROFESSOR + LINK_COMPLAINTS_VIEW} messmessageViewerExactPath={false}
    //                                 addPadding={true}
    //                             />;

    const navItemsAndComponents = [{text:'MyCourses', index:true, link: LINK_COURSES, exactLink:false, component:<CourseList createEnrollText={CREATE} userLink={LINK_INSTRUCTOR} />, id:1},
        {text:'Edit Profile', index:false, link: LINK_EDIT_PROFILE,  exactLink:true, component:<EditProfile />,  id:0}];

    
    const additionalComponents = [
        {link:LINK_COURSE, exactLink:false, component:<Course userLink={LINK_INSTRUCTOR} canPost={true} canAnnounceGrade={true} sendMessageShowStudentList={true} showCourseKey={true}/>, id:3}, 
    ];

    let location = useLocation();

    if (location.pathname === LINK_INSTRUCTOR)
        return <Navigate to={LINK_COURSES}/>;
    
    return (
        <AccountMain navItemsAndComponents={navItemsAndComponents} additionalComponents={additionalComponents}/>
        // <div>INSTRUCTOR</div>
    );
}
 
export default Instructor;