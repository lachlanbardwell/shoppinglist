import React from 'react';
import { Alert } from '@material-ui/lab';
import { IErrorDisplay } from '../types';

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
        <Alert className="alertClass" severity="error">
          Item is already in the list!
        </Alert>
      )}
      {!formError ? (
        ''
      ) : (
        <Alert className="alertClass" severity="error">
          No item selected.
        </Alert>
      )}
      {!fetchError ? (
        ''
      ) : (
        <Alert className="alertClass" severity="info">
          Select a store above.
        </Alert>
      )}
    </h3>
  );
};
