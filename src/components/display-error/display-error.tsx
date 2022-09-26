import React from 'react';
import { Alert } from '@material-ui/lab';
import { IErrorDisplay } from '../../types';
import './display-error.css';

export const DisplayError: React.FC<IErrorDisplay> = ({
  listError,
  formError,
  fetchError,
}) => {
  return (
    <h3>
      {!listError ? (
        ''
      ) : (
        <Alert className="alert-message" severity="error">
          Item is already in the list!
        </Alert>
      )}
      {!formError ? (
        ''
      ) : (
        <Alert className="alert-message" severity="error">
          No item selected.
        </Alert>
      )}
      {!fetchError ? (
        ''
      ) : (
        <Alert className="alert-message" severity="info">
          Select a store above.
        </Alert>
      )}
    </h3>
  );
};
