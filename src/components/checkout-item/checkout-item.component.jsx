import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';
import { 
    CheckoutItemContainer, 
    ImageContainer, 
    Image, 
    Name, 
    Quantity, 
    Price, 
    Value, 
    Arrow, 
    RemoveButton 
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const {name, imageUrl, price, quantity} = cartItem
    const {addItemToCart, decItemQty, removeItemFromCart} = useContext(CartContext)

    const increaseQuantityHandler = () => addItemToCart(cartItem)

    const decreaseQuantityHandler = () => decItemQty(cartItem)

    const removeHandler = () => removeItemFromCart(cartItem)
    
    return (
        cartItem.quantity > 0 && (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={name} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={decreaseQuantityHandler}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={increaseQuantityHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={removeHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
        )
    );
};

export default CheckoutItem;