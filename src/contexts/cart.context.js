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


export const CartContext = createContext({
    dropdownOpen: false,
    setDropdownOpen: () => {},
    cartItems: [],
    setCartItems: () => {}
})

export const CartProvider = ({ children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0) 
        setCartCount(newCount)
    }, [cartItems])

    const addItemToCart = (newCartItem) => {
        setCartItems(addCartItem(cartItems, newCartItem ));
    }

    const value = { dropdownOpen, setDropdownOpen, cartItems, addItemToCart, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}