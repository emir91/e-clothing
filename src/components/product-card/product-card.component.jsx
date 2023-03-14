import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { 
    ProductCardContainer, 
    ProductCardFooter, 
    ProductCardFooterName, 
    ProductCardFooterPrice 
} from './product-card.styles.jsx'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, imageUrl, price } = product;

    const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, product));
    
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <ProductCardFooter>
                <ProductCardFooterName>{name}</ProductCardFooterName>
                <ProductCardFooterPrice>{price}</ProductCardFooterPrice>
            </ProductCardFooter>
            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addItemToCartHandler}>Add to cart</Button>
        </ProductCardContainer>
    );
};

export default ProductCard;