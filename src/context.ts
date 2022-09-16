import { createContext } from 'react';

export const CartItems = createContext({
  cartItems: [],
  addCartItem: () => null,
  removeCartItem: () => null,
});
