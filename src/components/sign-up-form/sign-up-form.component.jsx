import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { createUserDocumentFromAuth, createUserEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer, SignUpTitle } from './sign-up-form.styles';
import { signUpStart, signUpSuccess } from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const {name, value } = e.target

        setFormFields({...formFields, [name]: value})
    }

    const resetFormFileds = () => {
        setFormFields(defaultFormFields)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword) {
            alert('Passwords must match!')
            return;
        }

        try {
            //const { user } = await createUserEmailAndPassword(email, password);
            //await createUserDocumentFromAuth(user, { displayName });
            
            dispatch(signUpStart(email, password, displayName));
            resetFormFileds()
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use.')
            } else {
                console.log(error);
            }
        }

    }
    return (
        <SignUpContainer>
            <SignUpTitle>I don't have account</SignUpTitle>
            <span>Sign up with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput 
                    label={'Display Name'} 
                    inputOptions={{
                      type:"text", 
                      required: true, 
                      name:'displayName', 
                      value:displayName, 
                      onChange:onChangeHandler
                    }}
                />
                
                <FormInput 
                    label={'Email'}
                    inputOptions={{
                        type:"email", 
                        required: true, 
                        name:'email', 
                        value: email, 
                        onChange: onChangeHandler
                    }}  
                />
                
                <FormInput 
                    label={'Password'}
                    inputOptions={{
                        type:"password",  
                        required: true, 
                        name:'password', 
                        value: password, 
                        onChange:onChangeHandler
                    }} 
                />
                
                <FormInput 
                    label={'Confirm Password'}
                    inputOptions={{
                        type:"password", 
                        required: true, 
                        name:'confirmPassword', 
                        value: confirmPassword, 
                        onChange:onChangeHandler
                    }} 
                />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;