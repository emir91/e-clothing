import { createContext, useState } from "react";

export const CartContext = createContext({
    dropdownOpen: false,
    setDropdownOpen: () => {}
})

export const CartProvider = ({ children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const value = { dropdownOpen, setDropdownOpen }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}