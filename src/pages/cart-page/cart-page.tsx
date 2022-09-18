import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        cartItems.map((next) => (
          <span key={next.id} className="cart-items">
            <h1>{next.id} -</h1>
            <h1>
              &nbsp;{next.quantity}&nbsp;({`$${next.price.toFixed(2)}`})
            </h1>
          </span>
        ))
      )}
      <Price productPayload={cartItems} />
      <Link to={'/'}>Return to shopping</Link>
    </div>
  );
};
