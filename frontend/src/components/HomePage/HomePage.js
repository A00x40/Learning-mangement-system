import React from 'react';
import {Link} from 'react-router-dom'
import { LINK_HOME, LINK_LOGIN, LINK_SIGNUP } from '../../Constants';
import RedirectHandler from '../RedirectHandler';
import styles from "./HomePage.module.css";
function HomePage() {
    return (
        <div className={styles.home}>
            
                <RedirectHandler redirectToHome={false} />
                <nav className={styles.home_nav}>
                    <Link to={LINK_HOME} className='no_text_decoration flex_align_center cursor_pointer' >
                        <img src="learning.svg"  width={50} height={50} alt="logo" />
                        <h1 className='font0'>LMS</h1>
                    </Link>
                    <ul className='list_style flex_align_center'>
                        <li className='cursor_pointer'>
                            <Link to={LINK_LOGIN} className='no_text_decoration font1'>
                                Login
                            </Link> 
                        </li>   
                        <li className='cursor_pointer'>
                            <Link to={LINK_SIGNUP}>
                                <button className={styles.home_button}>GetStarted</button>
                            </Link>
                        </li>
                    
                    </ul>
                </nav>
                <main>
                    <p className='font00 bold'>Welcome To LMS</p>
                </main>
               
        </div>
    )
}

export default HomePage;
