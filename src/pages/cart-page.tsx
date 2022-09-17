import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
      {cartItems.length === 0 ? (
        <h1>No items selected!</h1>
      ) : (
        cartItems.map((next) => <h1 key={next.id}>{next.id}</h1>)
      )}
      <Link to={'/'}>Return to shopping</Link>
    </div>
  );
};
