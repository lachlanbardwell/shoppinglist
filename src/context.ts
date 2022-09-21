import { createContext } from 'react';
import { IContextProps } from './types';

export const CartContext = createContext<IContextProps>({
  cartItems: [],
  setCartItems: () => [],
  calcTotal: () => 0,
});
