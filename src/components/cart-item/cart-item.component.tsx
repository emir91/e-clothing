import React from 'react';
import { 
    CartItemContainer, 
    CartImage, 
    ItemDetails, 
    CartItemName 
} from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem

    return (
        <CartItemContainer>
            <CartImage src={imageUrl} alt={name}/>
            <ItemDetails>
                <CartItemName>{name}</CartItemName>            
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;