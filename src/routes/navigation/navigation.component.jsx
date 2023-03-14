import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { currentUserSelector } from '../../store/user/user.selector';


import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles';
import { selectIsDropdownOpen } from '../../store/cart/cart.selector';



const Navigation = () => {
    const currentUser = useSelector(currentUserSelector);
    const dropdownOpen = useSelector(selectIsDropdownOpen);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>SHOP</NavLink>   
                    { currentUser ? 
                        <NavLink as='span' onClick={signOutUser}>
                            SIGNOUT
                        </NavLink> : 
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    }
                    <CartIcon />
                </NavLinksContainer>
                {dropdownOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;