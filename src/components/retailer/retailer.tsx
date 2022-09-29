import React, { useEffect } from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { IRetailerStore } from '../../types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './retailer.css';

export const Retailer: React.FC<IRetailerStore> = (props) => {
  useEffect(() => {
    props.store
      ? (document.title = `Shopping List from ${props.store}`)
      : (document.title = 'Shopping List');
  }, [props.store]);

  return (
    <div id="retailer-buttons">
      {props.store ? (
        <div id="reselect">
          <Button
            className="back-button"
            variant="contained"
            onClick={() => props.setStore('')}
          >
            <ArrowBackIcon /> &nbsp; Re-select
          </Button>

          <Tooltip title={`Shopping from ${props.store}`}>
            <img
              className="store-image-clicked"
              src={`https://logo.clearbit.com/${props.store}.com.au`}
            ></img>
          </Tooltip>
        </div>
      ) : (
        props.storeList.map((next) => {
          return (
            <Tooltip title={next} key={next}>
              <Button
                className="retailer-button"
                variant="contained"
                color="primary"
                key={next}
                value={next}
                onClick={() => props.setStore(next)}
              >
                {
                  <img
                    className="store-image"
                    src={`https://logo.clearbit.com/${next}.com.au`}
                  ></img>
                }
              </Button>
            </Tooltip>
          );
        })
      )}
    </div>
  );
};
