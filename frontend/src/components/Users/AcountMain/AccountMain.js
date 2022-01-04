import { Route, Routes, useLocation } from 'react-router-dom';
import {useState} from 'react';
import styles from './AccountMain.module.css';
import Header from './Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import RedirectHandler from '../../RedirectHandler.js';
import { LINK_INSTRUCTOR } from '../../../Constants';


/*
navItemsAndComponents = [
    {text:String, link:String, exactLink:bool, component:<ReactComponent/>, id:Number}, 
    {text:String, link:String, exactLink:bool, component:<ReactComponent/>, id:Number}, 
    ...
]
additionalComponents = [
    {link:String, exactLink:bool, component:<ReactComponent/>, overlay:false, id:Number}
]
*/

// additionalComponents are components that are not associated with a nav button.

const AccountMain = ({navItemsAndComponents, additionalComponents, additionalSidebarComponent}) => {


    const navItems = navItemsAndComponents.map(item => ({text:item.text, link:item.link, id:item.id}));

    console.log(navItemsAndComponents);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    let backdropStyle = styles.backdrop;
    let sidebarStyle = styles.sidebar;

    const sidebarShowHideHandler = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (isSidebarOpen) {
        backdropStyle = `${styles.backdrop} ${styles.backdrop_displayed}`;
        sidebarStyle = `${styles.sidebar} ${styles.sidebar_open}`;
        //console.log(backdropStyle);
    } else {
        backdropStyle = styles.backdrop;
        sidebarStyle = styles.sidebar;
        //console.log(backdropStyle);
    }


    return (
       
        <main className={styles.account_main}>

            <RedirectHandler/>

            <Header hamburgerClickHandler={sidebarShowHideHandler}/>
            <div className={sidebarStyle}>
                <Sidebar navItems={navItems} additionalComponent={additionalSidebarComponent}/>
            </div>

            
            {/*<Switch>
                {additionalComponents.map(item => {
                    if (item.overlay) {
                        return (
                            <Route path={item.link} exact={item.exactLink} key={item.id}>
                                <div className={styles.overlay}>
                                    <>{item.component}</>
                                </div>
                            </Route>
                        );
                    }
                })}
            </Switch>*/}

            <section className={styles.account_main_section}>
                <div className={backdropStyle} onClick={sidebarShowHideHandler}></div>
                <Routes>
                    {navItemsAndComponents.map(item => (
                        // <Route path={item.link} exact={item.exactLink} key={item.id} element={<>{item.component}</>}/>
                        <Route  path={item.link} key={item.id} element={item.component}/>
                            // <>{item.component}</>
                        // </Route>
                    ))}
                    {additionalComponents.map(item => {
                        //if (!item.overlay) {
                            return (
                                // <Route path={item.link} exact={item.exactLink} key={item.id} element={<>{item.component}</>}/>
                                <Route path={item.link}  key={item.id} element={item.component} />
                                //     {/* <>{item.component}</>
                                // </Route> */}
                            );
                        //}
                    })}
                </Routes>
            </section>
            
        </main>
        
    );
}
 
export default AccountMain;