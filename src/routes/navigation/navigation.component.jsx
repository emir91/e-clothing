import {useContext} from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'



const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const signOutHandler = async () => {
        await signOutUser()
        setCurrentUser(null)
    }
    
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/test'>SHOP</Link>   
                    { currentUser ? 
                        <div className='nav-link' onClick={signOutHandler}>
                            SIGNOUT
                        </div> : 
                        <Link className='nav-link' to='/auth'>SIGNIN</Link>
                    }
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;