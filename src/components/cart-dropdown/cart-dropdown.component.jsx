import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    
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