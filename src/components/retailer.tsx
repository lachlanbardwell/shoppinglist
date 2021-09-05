import React from 'react';
import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { useEffect } from 'react';

interface retailerStore {
  store: string;
  storeList: string[];
  setStore: (nextStore: string) => void;
}

export const Retailer: React.FC<retailerStore> = (props) => {
  useEffect(() => {
    props.store
      ? (document.title = `Shopping List from ${props.store}`)
      : (document.title = 'Shopping List');
  }, [props.store]);

  const Indicator = () => {
    return <p>{`Now shopping at ${props.store}`}</p>;
  };

  return (
    <div>
      {props.storeList ? <h2>Shopping from:</h2> : <br />}

      <Grid>
        <ButtonGroup id="retailerButtons" color="primary">
          {props.store ? (
            <Button
              className="retailerBtn"
              variant="contained"
              color="primary"
              onClick={() => props.setStore('')}
            >
              Re-select
            </Button>
          ) : (
            props.storeList.map((next) => {
              return (
                <Button
                  className="retailerBtn"
                  variant="contained"
                  color="primary"
                  key={next}
                  value={next}
                  onClick={() => props.setStore(next)}
                >
                  {next}
                </Button>
              );
            })
          )}
        </ButtonGroup>
        {props.store ? <Indicator /> : <br />}
      </Grid>
      {props.store ? (
        <img
          className="storeImage"
          src={`https://logo.clearbit.com/${props.store}.com.au`}
        ></img>
      ) : null}
      <br />
      {props.store ? (
        <a className="logo" href="https://clearbit.com">
          Logos provided by Clearbit
        </a>
      ) : null}
    </div>
  );
};
