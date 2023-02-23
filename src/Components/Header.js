import { Link, Outlet } from 'react-router-dom';
import styles from '../css/header.module.css';
import { useNavigate } from 'react-router-dom';


function Header(){

    // const navigate = useNavigate();

    // function handleNavigation(){
    //     navigate('/')
    // }
    return(
        <>
        <div className={styles.navbar}>
            <nav className={styles.main_nav}>
                 <Link to="/">
                <img className={styles.img} src='https://raw.githubusercontent.com/jeff-lent/Alisnobba/main/Capstone/Logo.png'></img>
                </Link>
            </nav>
        </div>
        <Outlet/>
        </>
    );
}
export default Header;