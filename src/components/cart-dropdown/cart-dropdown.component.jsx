import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)

    const navigate = useNavigate()

    const navigateCheckoutHandler = () => navigate('/checkout');
    
    return (
        <div className='cart-dropdown-container'>
            {cartItems.map((cartItem) => {
                return (
                    cartItem.quantity > 0 && (
                        <CartItem key={cartItem.id} cartItem={cartItem}/>
                    )
                )
                
            })}
                <Button onClick={navigateCheckoutHandler}>CHECKOUT</Button>
        </div> 
    );
};

export default CartDropdown;