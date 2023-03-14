import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    
    const navigate = useNavigate()

    const navigateCheckoutHandler = () => navigate('/checkout');
    
    return (
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ? (
                    cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem}/>)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
            }
            </CartItems>
            <Button onClick={navigateCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer> 
    );
};

export default CartDropdown;