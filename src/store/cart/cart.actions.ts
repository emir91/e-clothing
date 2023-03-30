import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../category/category.types";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  // find if cart contains product
  const foundProduct = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if found, increase quantity
  if (foundProduct) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // return new array with modified cart/ new product
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  // find the cart item to remove
  const existingCartItem: CartItem | undefined = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cart: CartItem[], product: CategoryItem) => {
  return cart.filter((item) => item.id !== product.id);
};

export type SetDropdownOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setDropdownOpen = withMatcher((bool: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  newCartItem: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, newCartItem);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  item: CategoryItem
) => {
  const newCartItems = removeCartItem(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  item: CategoryItem
) => {
  const newCartItems = clearCartItem(cartItems, item);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
