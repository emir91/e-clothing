import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    // find if cart contains product
    const foundProduct = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // if found, increase quantity
    if (foundProduct) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    // return new array with modified cart/ new product
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cart, product) => {
    return cart.filter((item) => item.id !== product.id)
}


export const CartContext = createContext({
    dropdownOpen: false,
    setDropdownOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    clearItemFromCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0,
    total: 0
})

const INITIAL_STATE = {
    dropdownOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                dropdownOpen: payload
            }
        default:
            throw new Error(`Unhandled ${type} type in cartReducer.`)
    }

}

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartCount, total, dropdownOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => (total + (cartItem.quantity * cartItem.price)), 0);

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems,
            cartCount: newCartCount,
            total: newCartTotal
        }));
    }

    const setDropdownOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const addItemToCart = (newCartItem) => {
        const newCartItems = addCartItem(cartItems, newCartItem);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (item) => {
        const newCartItems = removeCartItem(cartItems, item);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (item) => {
        const newCartItems = clearCartItem(cartItems, item);
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        dropdownOpen,
        setDropdownOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        total
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}