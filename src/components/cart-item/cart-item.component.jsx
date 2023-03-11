import React from 'react';
import { 
    CartItemContainer, 
    CartImage, 
    ItemDetails, 
    CartItemName 
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
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