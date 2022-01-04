import {useSelector, useDispatch} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import {selectAuthentication, loadAuthenticationStateCookie} from '../store/AuthenticationSlice'
import {
    STATUS_SUCCEEDED, 
    AUTHENTICATION_STATE_KEY, 
    AUTHENTICATION_TYPE_LOGIN, 
    USER_TYPE_LEARNER, 
    USER_TYPE_INSTRUCTOR, 
    LINK_LEARNER, 
    LINK_INSTRUCTOR,
    LINK_ADMIN,
    LINK_HOME,
    LINK_LOGIN,
    LINK_SIGNUP,
} from '../Constants'

const RedirectHandler = ({redirectToHome = true}) => {
    const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();
    let location = useLocation();

    let redirect = false;
    let redirectLink = '';

    if (localStorage.getItem(AUTHENTICATION_STATE_KEY) !== null && 
        authenticationState.status !== STATUS_SUCCEEDED) {
        dispatch(loadAuthenticationStateCookie())
    }

    if (authenticationState.status === STATUS_SUCCEEDED) {

        if (authenticationState.authenticationType === AUTHENTICATION_TYPE_LOGIN) {
            switch (authenticationState.userType) {
                case USER_TYPE_LEARNER:
                    if (!location.pathname.includes(LINK_LEARNER)){
                        redirect = true;
                        redirectLink = LINK_LEARNER;
                    }
                    break;
                case USER_TYPE_INSTRUCTOR:
                    //console.log(location.pathname);
                    if (!location.pathname.includes(LINK_INSTRUCTOR)){
                        redirect = true;
                        redirectLink = LINK_INSTRUCTOR;
                    }
                    break;
                default: //USER_TYPE_EMPLOYEE
                    if (!location.pathname.includes(LINK_ADMIN)){
                        redirect = true;
                        redirectLink = LINK_ADMIN;
                    }
                    break;
            }
        }
    } 
    else {
        if (redirectToHome) {
            redirect = true;
            redirectLink = '/';
        }
        // console.log(location.pathname);
        // if( location.pathname !== LINK_HOME
        // && !location.pathname !== LINK_LOGIN 
        // && !location.pathname !== LINK_SIGNUP
        // && !location.pathname !== '/') {
        //     redirect = true;
        //     redirectLink = LINK_HOME;
        // }
    }

    if (redirect)
        console.log("Redirecting: ", redirectLink);

    return (
        <div>
            {redirect && <Navigate to={redirectLink}/>}
        </div>
    );
}
 
export default RedirectHandler;