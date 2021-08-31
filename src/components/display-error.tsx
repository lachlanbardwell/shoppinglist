import React from 'react';
import { Alert } from '@material-ui/lab';

interface ErrorDisplay {
  listError: boolean;
  formError: boolean;
  fetchError: boolean;
}

export const DisplayError: React.FC<ErrorDisplay> = ({
  listError,
  formError,
  fetchError,
}) => {
  return (
    <h3>
      {!listError ? (
        ''
      ) : (
        <Alert severity="error">You may only select one of each item.</Alert>
      )}
      {!formError ? '' : <Alert severity="error">No item selected.</Alert>}
      {!fetchError ? '' : <Alert severity="info">Select a store above.</Alert>}
    </h3>
  );
};
