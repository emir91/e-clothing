import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
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
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems);
    
    const dispatch = useDispatch();

    const increaseQuantityHandler = () => dispatch(addItemToCart(cartItems, cartItem));

    const decreaseQuantityHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    const removeHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    
    return (
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
    );
};

export default CheckoutItem;