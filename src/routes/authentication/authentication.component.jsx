import React from 'react';
import SigninForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import './authentication.styles.scss'

const Authentication = () => {
    
    
    return (
        <div className='auth-container'>
            <SigninForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;