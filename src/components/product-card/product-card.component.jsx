import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { 
    ProductCardContainer, 
    ProductCardFooter, 
    ProductCardFooterName, 
    ProductCardFooterPrice 
} from './product-card.styles.jsx'

const ProductCard = ({ product }) => {
    const {addItemToCart} = useContext(CartContext)

    const { name, imageUrl, price } = product

    const addItemToCartHandler = () => addItemToCart(product)

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