import React, { useContext } from 'react';
import { CartContext } from '../../context/context';
import { itemCostTotal } from '../../transformers/item-cost';
import { IBasketOutput } from '../../types';
import { Avatar, Paper, Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './basket-output.css';

export const BasketOutput: React.FC<IBasketOutput> = (props) => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="basketOutput">
      {cartItems.length === 0
        ? null
        : cartItems.map((next, index) => (
            <Paper key={index} className="basketItems">
              <span className="basketItemNames">
                <p>{next.id}</p>
                <p className="basketItemPrice">{`$${next.price.toFixed(2)} ${
                  next.perkg ? 'per kg' : 'ea'
                }`}</p>
              </span>
              <span className="basket-quantity">
                <Avatar
                  className="basket-minus"
                  onClick={() => props.changeQuantity(next, 'subtract')}
                  style={{
                    backgroundColor: 'black',
                    margin: 'auto',
                    width: 18,
                    height: 18,
                  }}
                >
                  -
                </Avatar>
                &nbsp;
                <Avatar
                  className="basket-quantity-count"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    color: 'black',
                    width: 26,
                    height: 26,
                  }}
                >
                  {next.quantity}
                </Avatar>
                &nbsp;
                <Avatar
                  className="basket-plus"
                  onClick={() => props.changeQuantity(next, 'add')}
                  style={{
                    backgroundColor: 'black',
                    margin: 'auto',
                    width: 18,
                    height: 18,
                  }}
                >
                  +
                </Avatar>
                <p className="item-total">{itemCostTotal(next)}</p>
              </span>
              <Tooltip title="Remove item">
                <span
                  className="remove-single-item"
                  onClick={() => props.removeItem(next.id)}
                >
                  <CloseIcon className="close" />
                </span>
              </Tooltip>
            </Paper>
          ))}
    </div>
  );
};
