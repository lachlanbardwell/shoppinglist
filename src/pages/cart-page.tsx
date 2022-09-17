import React, { useContext } from 'react';
import { CartContext } from '../context';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
      {cartItems.map((next) => (
        <h1 key={next.id}>{next.id}</h1>
      ))}
    </div>
  );
};
