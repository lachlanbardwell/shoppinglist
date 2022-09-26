import { Button, Tooltip } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartImages } from '../../components/cart-images/cart-images';
import { Price } from '../../components/price';
import { CartContext } from '../../context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveIcon from '@material-ui/icons/Remove';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './cart-page.css';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <section
      className="cart-page-container"
      style={{ fontFamily: 'Play, sans-serif' }}
    >
      <Link to={'/'}>
        <Button className="reselectBtn" variant="contained">
          <ArrowBackIcon /> &nbsp; Return to shopping
        </Button>
      </Link>
      <div className="image-output" style={{ fontFamily: 'Play, sans-serif' }}>
        {cartItems.length === 0 ? <h1>No items selected!</h1> : <CartImages />}
      </div>
      <RemoveIcon
        preserveAspectRatio="none"
        style={{
          margin: 'auto',
          height: '60px',
          width: '80%',
        }}
      />
      <Price productPayload={cartItems} />
      <div className="cart-output">
        <span className="cart-pay">
          <h1>Proceed to secure payment</h1>
          <Tooltip title="App for testing purposes only">
            <span className="pay-icons">
              <LocalAtmIcon style={{ fontSize: '60px', margin: 'auto' }} />
              <ArrowForwardIcon style={{ fontSize: '45px' }} />
            </span>
          </Tooltip>
        </span>
      </div>
    </section>
  );
};
