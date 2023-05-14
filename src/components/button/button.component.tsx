import { FC,ButtonHTMLAttributes} from 'react';
import { 
    BaseButton, 
    GoogleSignInButton, 
    InvertedButton,
    LoadingSpinner 
} from './button.styles';


export enum BUTTON_TYPES_CLASSES {
    base = 'base',
    inverted = 'inverted',
    google = 'google-sign-in'
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base): typeof BaseButton => {
    return {
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
      }[buttonType]
 
};

type ButtonType = {
    buttonType?: BUTTON_TYPES_CLASSES;
    isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonType> = ({ children, buttonType, isLoading = false, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <LoadingSpinner /> : children}
        </CustomButton>
    );
};

export default Button;