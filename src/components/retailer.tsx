import React from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';

export const Retailer = () => {
  const initialStoreState = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
  const [store, setStore] = useState<string[]>(initialStoreState);

  useEffect(() => {
    if (store.length === 1) {
      document.title = `Shopping List from ${store}`;
    }
  }, [store]);

  const Indicator = () => {
    return <p>{`Make your selection from ${store}!`}</p>;
  };

  const selectStore = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    if (store.length > 1) {
      setStore(() => store.filter((prev) => prev === currentTarget.value));
    } else {
      setStore(initialStoreState);
    }
  };

  return (
    <div>
      {store.length > 1 ? <h2>Shopping from:</h2> : <br />}
      <Grid>
        {store.map((prev) => {
          return (
            <ButtonGroup color="primary" key={prev} orientation="vertical">
              <Button key={prev} value={prev} onClick={selectStore}>
                {store.length === 1 ? 'Re-select' : prev}
              </Button>
            </ButtonGroup>
          );
        })}
        {store.length === 1 ? <Indicator /> : <br />}
      </Grid>
    </div>
  );
};
