import SigninForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import { AuthContainer } from './authentication.styles';

const Authentication = () => {
    
    
    return (
        <AuthContainer>
            <SigninForm />
            <SignUpForm />
        </AuthContainer>
    );
};

export default Authentication;