import {useContext} from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'



const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { dropdownOpen } = useContext(CartContext)

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>   
                    { currentUser ? 
                        <div className='nav-link' onClick={signOutUser}>
                            SIGNOUT
                        </div> : 
                        <Link className='nav-link' to='/auth'>SIGN IN</Link>
                    }
                <CartIcon />
                </div>
            {dropdownOpen && <CartDropdown />}
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;