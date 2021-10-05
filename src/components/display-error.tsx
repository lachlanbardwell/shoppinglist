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
        <Alert severity="error">
          Item is already in the list! Also, lockdown restrictions.
        </Alert>
      )}
      {!formError ? '' : <Alert severity="error">No item selected.</Alert>}
      {!fetchError ? '' : <Alert severity="info">Select a store above.</Alert>}
    </h3>
  );
};
