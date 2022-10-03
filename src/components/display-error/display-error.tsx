import React, { useContext } from 'react';
import { CartContext } from '../../context/context';
import { Alert } from '@material-ui/lab';
import { IErrorDisplay } from '../../types';
import './display-error.css';
import { Button } from '@material-ui/core';

export const DisplayError: React.FC<IErrorDisplay> = (props) => {
  const { cartItems } = useContext(CartContext);

  const itemMatch = () => {
    const matchingStores = cartItems
      .filter((next) => next.id === props.newItem)
      .map((next) => next.store);
    return matchingStores.length === 1 ? matchingStores : 'multiple stores';
  };

  return (
    <h3 className="alert-display">
      {props.error.duplicate && (
        <Alert className="alert-message" severity="error">
          Item is already in the list!
        </Alert>
      )}
      {props.error.noItem && (
        <Alert className="alert-message" severity="error">
          No item selected.
        </Alert>
      )}
      {props.error.otherStore && (
        <>
          <Alert className="alert-message" severity="warning">
            You have already selected {props.newItem} from&nbsp;
            {itemMatch()}. Proceed anyway?
          </Alert>
          <div className="confirm-buttons">
            <Button
              className="confirm"
              onClick={() => {
                props.addToBasket(props.newItem);
                props.setNewItem('');
                props.setError({
                  duplicate: false,
                  noItem: false,
                  otherStore: false,
                });
              }}
            >
              Yes
            </Button>
            <Button
              className="confirm"
              onClick={() =>
                props.setError({
                  duplicate: false,
                  noItem: false,
                  otherStore: false,
                })
              }
            >
              No
            </Button>
          </div>
        </>
      )}
    </h3>
  );
};
