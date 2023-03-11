import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ShoppingCart, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { dropdownOpen, setDropdownOpen, cartCount } = useContext(CartContext)

    const onToggleHandler = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <CartIconContainer onClick={onToggleHandler}>
            <ShoppingCart />
            <ItemCount>{cartCount}</ItemCount>            
        </CartIconContainer>
    );
};

export default CartIcon;