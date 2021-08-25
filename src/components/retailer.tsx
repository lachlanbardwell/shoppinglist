import React from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { useEffect } from 'react';

interface retailerStore {
  store: string[];
  selectStore: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Retailer: React.FC<retailerStore> = (props) => {
  useEffect(() => {
    props.store.length === 1
      ? (document.title = `Shopping List from ${props.store}`)
      : (document.title = 'Shopping List');
  }, [props.store]);

  const Indicator = () => {
    return <p>{`Now shopping at ${props.store}`}</p>;
  };

  return (
    <div>
      {props.store.length > 1 ? <h2>Shopping from:</h2> : <br />}

      <Grid>
        {props.store.map((prev) => {
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
                onClick={props.selectStore}
              >
                {props.store.length === 1 ? 'Re-select' : prev}
              </Button>
            </ButtonGroup>
          );
        })}
        {props.store.length === 1 ? <Indicator /> : <br />}
      </Grid>
      {props.store.length === 1 ? (
        <img
          className="storeImage"
          src={`https://logo.clearbit.com/${props.store}.com.au`}
        ></img>
      ) : null}
      <br />
      {props.store.length === 1 ? (
        <a className="logo" href="https://clearbit.com">
          Logos provided by Clearbit
        </a>
      ) : null}
    </div>
  );
};
