import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            })}
            <Total>
                Total: ${total}
            </Total>
        </CheckoutContainer>
    );
};

export default Checkout;