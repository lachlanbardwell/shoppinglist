import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartImages } from '../../components/cart-images/cart-images';
import { Price } from '../../components/price';
import { CartContext } from '../../context';
import './cart-page.css';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      {cartItems.length === 0 ? (
        <h1>No items selected!</h1>
      ) : (
        <div className="cart-items">
          <CartImages items={cartItems} />
        </div>
      )}
      <Price productPayload={cartItems} />
      <Link to={'/'}>Return to shopping</Link>
    </div>
  );
};
