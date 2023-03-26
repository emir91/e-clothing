import React from 'react';
import { 
    BaseButton, 
    GoogleSignInButton, 
    InvertedButton,
    LoadingSpinner 
} from './button.styles';


export const BUTTON_TYPES_CLASSES = {
    base: 'base',
    inverted: 'inverted',
    google: 'google-sign-in'
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => {
    return {
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
      }[buttonType]
 
};

const Button = ({ children, buttonType, isLoading = false, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <LoadingSpinner /> : children}
        </CustomButton>
    );
};

export default Button;