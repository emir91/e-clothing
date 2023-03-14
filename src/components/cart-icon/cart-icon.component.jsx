import { useDispatch, useSelector } from 'react-redux';
import { setDropdownOpen } from '../../store/cart/cart.actions';
import { CartIconContainer, ShoppingCart, ItemCount } from './cart-icon.styles';
import { selectCartCount, selectIsDropdownOpen } from '../../store/cart/cart.selector';

const CartIcon = () => {
    const dispatch = useDispatch();
    const dropdownOpen = useSelector(selectIsDropdownOpen);
    const cartCount = useSelector(selectCartCount);

    const onToggleHandler = () => {
        console.log(dropdownOpen);
        dispatch(setDropdownOpen(!dropdownOpen));
    }

    return (
        <CartIconContainer onClick={onToggleHandler}>
            <ShoppingCart />
            <ItemCount>{cartCount}</ItemCount>            
        </CartIconContainer>
    );
};

export default CartIcon;