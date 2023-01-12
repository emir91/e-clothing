import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import { signInEmailPassword, signinWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields


    const onChangeHandler = (e) => {
        const { name, value } = e.target

        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async () => {
        const response = await signinWithGooglePopup()
        await createUserDocumentFromAuth(response.user)
    }

    const resetFormFileds = () => {
        setFormFields(defaultFormFields)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await signInEmailPassword(email, password)

            console.log(response);
            // await createUserDocumentFromAuth(user)

            resetFormFileds()
        } catch (error) {
            console.log('Somethingwent wrong', error);
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
            <FormInput label={'email'} inputOptions={{ type: 'email', required: true, name: 'email', value: email, onChange: onChangeHandler }}/>
            <FormInput label={'password'} inputOptions={{ type: 'password', required: true, name: 'password', value: password, onChange: onChangeHandler }} />

            <div className='buttons-container'>
                <Button type="submit">Sign In</Button>
                <Button onClick={logGoogleUser} buttonType={'google'}>Google Sign In</Button>
            </div>
        </form>
        
        </div>
    );
};

export default SigninForm;