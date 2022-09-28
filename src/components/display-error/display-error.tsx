import React from 'react';
import { Alert } from '@material-ui/lab';
import { IErrorDisplay } from '../../types';
import './display-error.css';

export const DisplayError: React.FC<IErrorDisplay> = (props) => {
  return (
    <h3>
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
    </h3>
  );
};
