import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setDropdownOpen } from "./cart.actions";

export type CartState = {
  readonly dropdownOpen: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  dropdownOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  if (setDropdownOpen.match(action)) {
    return {
      ...state,
      dropdownOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;

  //   const { type, payload } = action;

  //   switch (type) {
  //     case CART_ACTION_TYPES.SET_CART_ITEMS:
  //       return {
  //         ...state,
  //         cartItems: payload,
  //       };
  //     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //       return {
  //         ...state,
  //         dropdownOpen: payload,
  //       };
  //     default:
  //       return state;
  //   }
};
