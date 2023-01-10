import React from 'react';
import { signinWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const Signin = () => {

    const logGoogleUser = async () => {
        const response = await signinWithGooglePopup()
        await createUserDocumentFromAuth(response.user)
    }

    return (
        <div>
            Signin Page
            <button onClick={logGoogleUser}>Signin With Google</button>
        </div>
    );
};

export default Signin;