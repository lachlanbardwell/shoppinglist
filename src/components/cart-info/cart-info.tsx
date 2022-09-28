import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/context';
import { Price } from '../price/price';
import { Badge, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InputIcon from '@material-ui/icons/Input';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ICartInfo } from '../../types';
import './cart-info.css';

export const CartInfo: React.FC<ICartInfo> = (props) => {
  const { cartItems, setCartItems, calcTotal } = useContext(CartContext);

  return (
    <div className="infoOutput" style={{ fontFamily: 'Play, sans-serif' }}>
      <Button
        className="clear-all"
        onClick={() => {
          setCartItems([]);
          props.setNewItem('');
        }}
      >
        <DeleteForeverIcon />
        &nbsp; Clear all
      </Button>
      <Price productPayload={cartItems} />
      <span className="checkout">
        <h3>Checkout</h3>
        <Link to={'/cart'} style={{ display: 'flex', color: 'black' }}>
          <Badge
            badgeContent={calcTotal(cartItems)}
            color="secondary"
            overlap="rectangular"
            showZero
          >
            <ShoppingCartIcon style={{ fontSize: '60px' }} />
          </Badge>
          <InputIcon
            style={{
              fontSize: '30px',
              marginTop: 'auto',
            }}
          />
        </Link>
      </span>
    </div>
  );
};
