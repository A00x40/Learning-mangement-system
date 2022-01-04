import {useLocation, Link} from 'react-router-dom'
import styles from './Tab.module.css'

const Tab = ({iconImgSrc, text, link}) => {
    
    let style = styles.tab;
    if (useLocation().pathname.includes(link)) {
        style = `${styles.tab} ${styles.tab_selected}`;
    } else {
        style = styles.tab;
    }

    return (
        <Link className={style} to={link}>
            {iconImgSrc && <img className={styles.tab_img} src={iconImgSrc} alt="Tab icon" />}
            <p >{text}</p>
        </Link>
    );
}
 
export default Tab;