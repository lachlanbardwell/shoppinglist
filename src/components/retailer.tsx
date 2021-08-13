import React from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';

export const Retailer = () => {
  const initialStoreState = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
  const [store, setStore] = useState<string[]>(initialStoreState);

  useEffect(() => {
    store.length === 1
      ? (document.title = `Shopping List from ${store}`)
      : (document.title = 'Shopping List');
  }, [store]);

  const Indicator = () => {
    return <p>{`Now shopping at ${store}`}</p>;
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
            <ButtonGroup
              id="retailerButtons"
              color="primary"
              key={prev}
              orientation="vertical"
            >
              <Button
                className="retailerBtn"
                variant="contained"
                color="primary"
                key={prev}
                value={prev}
                onClick={selectStore}
              >
                {store.length === 1 ? 'Re-select' : prev}
              </Button>
            </ButtonGroup>
          );
        })}
        {store.length === 1 ? <Indicator /> : <br />}
      </Grid>
      {store.length === 1 ? (
        <img
          className="storeImage"
          src={`https://logo.clearbit.com/${store}.com.au`}
        ></img>
      ) : null}
    </div>
  );
};
