import { createContext, useEffect, useState } from "react";

const addCartItem = (cart, product) => {
    // find if cart contains product
    const foundProduct = cart.find((item) => item.id === product.id);

    // if found, increase quantity
    if(foundProduct) {
        return cart.map((item) => product.id === item.id ? {...item, quantity: item.quantity + 1} : item)
    }

    // return new array with modified cart/ new product
    return [...cart, {...product, quantity: 1}]
}

const decreaseCartItemQty = (cart, product) => {
    if(product.quantity === 1) {
        removeCartItem(cart, product)
    }
    return cart.map((item) => product.id === item.id ? {...item, quantity: item.quantity - 1} : item)
}

const removeCartItem = (cart, product) => {
    return cart.filter((item) => item.id !== product.id)
}


export const CartContext = createContext({
    dropdownOpen: false,
    setDropdownOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    decItemQty: () => {},
    removeCartItem: () => {},
    cartCount: 0,
    total: 0
})

export const CartProvider = ({ children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0);
        const newTotal = cartItems.reduce((total, cartItem) => (total + (cartItem.quantity * cartItem.price)), 0);
        setCartCount(newCount);
        setTotal(newTotal);
    }, [cartItems])

    const addItemToCart = (newCartItem) => {
        setCartItems(addCartItem(cartItems, newCartItem ));
    }

    const decItemQty = (item) => {
        setCartItems(decreaseCartItemQty(cartItems, item ));
    }

    const removeItemFromCart = (item) => {
        setCartItems(removeCartItem(cartItems, item));
    }
    

    const value = { 
        dropdownOpen, 
        setDropdownOpen, 
        addItemToCart, 
        decItemQty, 
        removeItemFromCart, 
        cartItems, 
        cartCount, 
        total 
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}