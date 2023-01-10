import { useState } from 'react';
import { createUserDocumentFromAuth, createUserEmailAndPassword } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

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
            const { user } = await createUserEmailAndPassword(email, password)

            await createUserDocumentFromAuth(user, { displayName })
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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={onSubmitHandler}>
                <label>Display Name</label>
                <input type="text" required name='displayName' value={displayName} onChange={onChangeHandler}/>

                <label>Email</label>
                <input type="email" required name='email' value={email} onChange={onChangeHandler}/>

                <label>Password</label>
                <input type="password" required name='password' value={password} onChange={onChangeHandler}/>

                <label>Confirm Password</label>
                <input type="password" required name='confirmPassword' value={confirmPassword} onChange={onChangeHandler}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;