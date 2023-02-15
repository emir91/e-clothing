import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)

    
    return (
        <div className='cart-dropdown-container'>
            {cartItems.map((cartItem) => {
                return (

                    <CartItem key={cartItem.id} cartItem={cartItem}/>
                )
                
            })}
            <Button>CHECKOUT</Button>
        </div> 
    );
};

export default CartDropdown;