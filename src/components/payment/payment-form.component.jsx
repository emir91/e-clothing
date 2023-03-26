import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCartTotal } from "../../store/cart/cart.selector";
import { currentUserSelector } from "../../store/user/user.selector";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, { BUTTON_TYPES_CLASSES} from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(currentUserSelector);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch("/.netlify/functions/make-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName :"Emir Vranac"
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if(paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment successful!");
            }
        }
    }
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <CardElement/>
                <Button 
                    buttonType={BUTTON_TYPES_CLASSES.inverted}
                    isLoading={isProcessingPayment}
                    >
                    Pay Now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;