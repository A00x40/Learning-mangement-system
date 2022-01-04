import {useLocation} from 'react-router-dom'

const SidebarButton = ({text, link}) => {

    let style = 'font2_white';
    if (useLocation().pathname.includes(link)) {
        style = `font2_white bold`;
    } else {
        style = `font2_white`;
    }

    return (
        <p className={style}>{text}</p>
    );
}
 
export default SidebarButton;