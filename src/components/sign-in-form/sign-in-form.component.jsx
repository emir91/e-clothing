import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import FormInput from '../../components/form-input/form-input.component';
import Button, {BUTTON_TYPES_CLASSES} from '../../components/button/button.component';
import { signInEmailPassword, signinWithGooglePopup } from '../../utils/firebase/firebase.utils';

import { SignInContainer, SignInTitle, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: ''
}


const SigninForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields
    const dispatch = useDispatch();


    const onChangeHandler = (e) => {
        const { name, value } = e.target

        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = () => {
        dispatch(googleSignInStart())
    }

    const resetFormFileds = () => {
        setFormFields(defaultFormFields)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFileds()
        } catch (error) {
            console.log('Something went wrong', error);
        } 
    }

    return (
        <SignInContainer>
            <SignInTitle>Already have an account</SignInTitle>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmitHandler}>
                <FormInput label={'email'} inputOptions={{ type: 'email', required: true, name: 'email', value: email, onChange: onChangeHandler }}/>
                <FormInput label={'password'} inputOptions={{ type: 'password', required: true, name: 'password', value: password, onChange: onChangeHandler }} />

                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button onClick={logGoogleUser} buttonType={BUTTON_TYPES_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SigninForm;