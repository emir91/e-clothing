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

const CheckoutItem = ({ cartItem }) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems);
    
    const dispatch = useDispatch();

    const increaseQuantityHandler = () => dispatch(addItemToCart(cartItems, cartItem)) //addItemToCart(cartItem) 

    const decreaseQuantityHandler = () => dispatch(removeItemFromCart(cartItems, cartItem)) //removeItemFromCart(cartItem)

    const removeHandler = () =>   dispatch(clearItemFromCart(cartItems, cartItem))//clearItemFromCart(cartItem)
    
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