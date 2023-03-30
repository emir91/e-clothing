import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state: { cart: CartState }): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsDropdownOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.dropdownOpen
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
