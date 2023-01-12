import React from 'react';
import './button.styles.scss'

const Button = ({ children, buttonType, ...otherProps}) => {

    const BUTTON_TYPES_CLASSES = {
        inverted: 'inverted',
        google: 'google-sign-in'
    }

    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;