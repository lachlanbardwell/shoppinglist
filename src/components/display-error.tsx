import React from 'react';

interface ErrorDisplay {
  listError: boolean;
  formError: boolean;
}

export const DisplayError: React.FC<ErrorDisplay> = ({
  listError,
  formError,
}) => {
  return (
    <h3 className="errorStyles">
      {listError === true ? `You may only select one of each item.` : null}{' '}
      {formError === true ? `No item selected.` : null}
    </h3>
  );
};
