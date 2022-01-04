import styles from './LoginSignup.module.css';
import {
    LINK_HOME,
    LINK_LOGIN, 
    LINK_SIGNUP, 
    AUTHENTICATION_TYPE_LOGIN, 
    AUTHENTICATION_TYPE_SIGNUP,
    STATUS_LOADING,
    STATUS_FAILED, 
    STATUS_SUCCEEDED,
    // AUTHENTICATION_STATE_KEY,
    // LINK_PROFESSOR,
    // LINK_STUDENT
} from '../../Constants'
import {Link, useLocation} from 'react-router-dom';
import {useState} from 'react'
import {loginSignupRequest, selectAuthentication} from '../../store/AuthenticationSlice'
import {useSelector, useDispatch} from 'react-redux';
import RedirectHandler from '../RedirectHandler';
import { USER_TYPE_ADMIN, USER_TYPE_INSTRUCTOR, USER_TYPE_LEARNER } from '../../Constants';
import Tab from '../Tab/Tab';
import BirthDate from '../BirthDate/BirthDate';


const LoginSignup = () => {
    const authenticationState = useSelector(selectAuthentication);
    const dispatch = useDispatch();
    console.log("authenticationState", authenticationState);
    let location = useLocation();
 
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [signupData, setSignupData] = useState({username: '', firstName: '', lastName: '', birthDate: '01/01/2022'
                                                , email: '', password: '', confirmationPasswrod: ''});
    const [userType, setUserType] = useState(USER_TYPE_LEARNER);
    
    const onChangeRadioValue = (event) => setUserType(event.target.value);
    const onChangeLoginEmail = (event) => setLoginData({...loginData, email: event.target.value});
    const onChangeLoginPassword = (event) => setLoginData({...loginData, password: event.target.value});
    const onChangeSignupUsername = (event) => setSignupData({...signupData, username: event.target.value});
    const onChangeSignupFirstName = (event) => setSignupData({...signupData, firstName: event.target.value});
    const onChangeSignupLastName = (event) => setSignupData({...signupData, lastName: event.target.value});
    const onChangeSignupPassword = (event) => setSignupData({...signupData, password: event.target.value});
    // const onChangeSignupConfirmationPassword = (event) => setSignupData({...signupData, confirmationPasswrod: event.target.value});
    const onChangeSignupBirthDate = (event, isDay) => {
        // console.log(typeof event.target.value); 
        let birthDate = signupData.birthDate.split('/');
        if(isDay){
            // birthDate[0] = event.target.value === '' ? '00': event.target.value;
            birthDate[0] = event.target.value;
        }
        else if(!isDay && event.target.value.length === 2) {
            
            // birthDate[1] = event.target.value === '' ? '00': event.target.value;
            birthDate[1] = event.target.value;
        }
        else {
            // birthDate[2] = event.target.value === '' ? '0000': event.target.value;
            birthDate[2] = event.target.value;
        }
        birthDate = birthDate.join('/');
        console.log(`birthDate = ${birthDate}`)
        setSignupData({...signupData, birthDate});
    };
    const onChangeSignupEmail = (event) => setSignupData({...signupData, email: event.target.value});

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let type;
        switch (userType) {
            case 'learner':
                type = 0;
                break;
            case 'instructor':
                type = 1;
                break;
            default:
                type = 2
                break;
        }
        let loginBody = {
            "email": loginData.email,
            "password": loginData.password,
            type
        };
        
        let signupBody = {
            "username": signupData.username,
            "firstname": signupData.firstName,
            "lastname": signupData.lastName,
            "birthdate": signupData.birthDate,
            "email": signupData.email,
            "password": signupData.password,
            type 
        };
        
        
        let info;
        if (location.pathname.includes(LINK_LOGIN)) info = loginBody;
        else info = signupBody;

        console.log(`chosenBody Data => ${info}`);

        let params = {
            userType: userType, 
            authenticationType: location.pathname.includes(LINK_LOGIN) ? AUTHENTICATION_TYPE_LOGIN : AUTHENTICATION_TYPE_SIGNUP,
            body: info
        };
        dispatch(loginSignupRequest(params));
        //console.log(event);
    };

    return (
        <div style={{width:"100%", height:"100%"}}>

            <RedirectHandler redirectToHome={false} />

            <div role="banner">
                <div className={`${styles.header} flex_center`}>
                    <Link to={LINK_HOME} className='no_text_decoration flex_align_center cursor_pointer'>
                        <img src="/learning.svg"  width={40} height={40} alt="logo" />
                        <h1 className='font0'>LMS</h1>
                    </Link>
                </div>
            </div>
            <main className={styles.login_signup}>
                <div className={styles.login_signup_child}>
                    <div className={styles.tabs}>
                        <Tab text='Login' link={LINK_LOGIN}/>
                        <Tab text='Signup' link={LINK_SIGNUP}/>
                    </div>
                    <form className={styles.form} onSubmit={onSubmitHandler}>
                        <div className={`${styles.radios} font2`}>
                            <div className={styles.radio_label}>
                                <input type="radio" id="learnerRadio" value={USER_TYPE_LEARNER} name="userType" onChange={onChangeRadioValue} checked={userType === USER_TYPE_LEARNER}/> 
                                <label htmlFor="learnerRadio">Learner</label>
                            </div>

                            <div className={styles.radio_label}>
                                <input type="radio" id="instructorRadio" value={USER_TYPE_INSTRUCTOR} name="userType" onChange={onChangeRadioValue} checked={userType === USER_TYPE_INSTRUCTOR}/> 
                                <label htmlFor="instructorRadio">Instructor</label>
                            </div>
                            
                            { location.pathname.includes(LINK_LOGIN) && <div className={styles.radio_label}>
                                <input type="radio" id="adminRadio" value={USER_TYPE_ADMIN} name="userType" onChange={onChangeRadioValue} checked={userType === USER_TYPE_ADMIN}/> 
                                <label htmlFor="adminRadio">Admin</label>
                            </div>}

                        </div>
                        {location.pathname.includes(LINK_LOGIN) && 
                            <div className={styles.fields}>
                                <input className={`${styles.input_text} font1`} type="email" placeholder="Enter Email"  value={loginData.email} onChange={onChangeLoginEmail} required/>
                                <input className={`${styles.input_text} font1`} type="password" placeholder="Enter Password"  value={loginData.password} onChange={onChangeLoginPassword} required/>
                                <button className={"input_button"} type="submit">Login</button>
                            </div>
                        }
                        {location.pathname.includes(LINK_SIGNUP) && 
                            <div className={styles.fields}>
                                <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Username"  value={signupData.username} onChange={onChangeSignupUsername} required/>
                                <input className={`${styles.input_text} font1`} type="text" placeholder="Enter First Name"  value={signupData.firstName} onChange={onChangeSignupFirstName} required/>
                                <input className={`${styles.input_text} font1`} type="text" placeholder="Enter Last Name"  value={signupData.lastName} onChange={onChangeSignupLastName} required/>
                                <BirthDate onChangeSignupBirthDate={onChangeSignupBirthDate} />
                                <input className={`${styles.input_text} font1`} type="email" placeholder="Enter Email"  value={signupData.email} onChange={onChangeSignupEmail} required/>
                                <input className={`${styles.input_text} font1`} type="password" placeholder="Password" name="re_psw" value={signupData.password} onChange={onChangeSignupPassword} required/>
                                {/* <input className={`${styles.input_text} font1`} type="password" placeholder="Re-Enter Password" name="re_psw" value={signupData.confirmationPasswrod} onChange={onChangeSignupConfirmationPassword} required/> */}
                                <button className="input_button" type="submit" >Signup</button>
                            </div>
                        }
                        {authenticationState.status === STATUS_LOADING && <p className='font2 bold center_text'>Loading...</p>}
                        {/* {authenticationState.status === STATUS_FAILED && <p className='font2 bold center_text red'>{authenticationState.error}</p>} */}
                        
                        {(authenticationState.status === STATUS_SUCCEEDED && 
                            location.pathname.includes(LINK_SIGNUP)) &&
                            <p className='font2 bold center_text'>Successful signup, you can login now.</p>
                        }
                    </form>
                </div>
            </main>
        </div> 
    );
};
 
export default LoginSignup;