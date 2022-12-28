import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/test'>SHOP</Link>   
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;