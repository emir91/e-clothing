import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingCartIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss'

const CartIcon = () => {
    const { dropdownOpen, setDropdownOpen, cartCount } = useContext(CartContext)

    const onToggleHandler = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div className='cart-icon-container' onClick={onToggleHandler}>
            <ShoppingCartIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>            
        </div>
    );
};

export default CartIcon;