import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Grid,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cart } from './cart';
import { Retailer } from './retailer';
import { Price } from './price';
import { DisplayError } from './display-error';
import { IProduct } from '../models';
import * as storeApi from '../api/store-api';
import * as mockStoreApi from '../api/mocks/mock-store-api';
import { makeStyles } from '@material-ui/styles';
import { Department } from './depart';

const initialStoreState: string[] = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
const useStyles = makeStyles(() => ({
  circularProgress: {
    marginTop: -20,
    marginRight: -40,
  },
}));

export const AddToBasket: React.FC = () => {
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [basket, setBasket] = useState<IProduct[]>([]);
  const [depart, setDepart] = useState<string>('produce');
  const [storeError, setStoreError] = useState<boolean>(false);
  const [noItemError, setNoItemError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [items, setItems] = useState<string[] | null>(null);
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  const [store, setStore] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const classes = useStyles();

  //TODO : Remove use of mocks after backend is sorted
  // First attempt backend api call, otherwise call from mock api
  const getItems = async (service: typeof storeApi, isMock?: boolean) => {
    setisLoading(true);
    try {
      console.log(`Attempting to call ${isMock ? 'mock' : 'actual'} api`);
      const result = await service.getItems(store, depart);
      console.log(`Called ${isMock ? 'mock' : 'actual'} api`);
      console.log('result list', result);
      setAvailableProducts(result);
      setItems(result.map((prev: IProduct) => prev.id).sort());
      setisLoading(false);
    } catch (error) {
      console.log(`Failed to call ${isMock ? 'mock' : 'actual'} api`);
      if (!isMock) {
        getItems(mockStoreApi, true);
      } else {
        setisLoading(false);
      }
      console.error('Api call failed');
    }
  };

  useEffect(() => {
    if (!store || !depart) {
      return;
    }
    setDuplicateError(false);
    setNoItemError(false);
    getItems(storeApi);
  }, [store, depart]);

  useEffect(() => {
    if (!store) {
      setNewItem('');
      setAvailableProducts([]);
      setBasket([]);
      setItems(null);
      setValue('');
      setDuplicateError(false);
      setNoItemError(false);
    }
    setStoreError(false);
  }, [store]);

  const addItem = () => {
    if (!store) {
      setStoreError(true);
      return;
    }
    if (basket.find((next) => next.id === newItem)) {
      setDuplicateError(true);
      setNewItem('');
      return;
    }
    if (!newItem) {
      setNoItemError(true);
      return;
    }
    handleItemSelection(newItem);
    setNoItemError(false);
    setDuplicateError(false);
    setNewItem('');
  };

  const removeItem = (itemToRemove: string) => {
    setBasket((prevState) =>
      prevState.filter((prevItem) => prevItem.id !== itemToRemove),
    );
    setNoItemError(false);
    setDuplicateError(false);
  };

  const buttonStyles: Record<string, string> = {
    color: 'white',
    backgroundColor: '#282c34',
    display: 'flex',
  };

  const handleItemSelection = (nextItem: string) => {
    const selection = availableProducts.find((next) => next.id === nextItem);
    if (!selection) {
      console.error('could not find next item', nextItem);
      return;
    }
    setBasket((prev) => [...prev, selection]);
  };

  const convertDepart = (inputDepart: string) => {
    return (
      inputDepart.substring(0, 1).toUpperCase() + inputDepart.substring(1) + ' '
    );
  };

  return (
    <Box>
      <div className="boxStyles">
        <Retailer
          storeList={initialStoreState}
          store={store}
          setStore={setStore}
        />

        {store ? (
          <>
            <Paper className="paperClass">
              <h2 className="cartHeading">
                {convertDepart(depart)}
                Department
              </h2>
            </Paper>
            <Department
              depart={depart}
              setDepart={setDepart}
              convert={convertDepart}
            ></Department>
          </>
        ) : null}
        <br />
        <Autocomplete
          autoComplete
          openOnFocus
          onChange={(event, value: string | null) => {
            if (value !== null && value !== 'Loading...') {
              setNewItem(value);
            } else {
              setNewItem('');
            }
          }}
          getOptionSelected={(option, value) =>
            option === value || value === ''
          }
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                disabled={isLoading}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress
                          classes={{ root: classes.circularProgress }}
                          size={20}
                        />
                      ) : (
                        params.InputProps.endAdornment
                      )}
                    </>
                  ),
                }}
                variant="filled"
                label={isLoading ? 'Loading...' : 'What do you want to buy?'}
                value={basket}
              ></TextField>
            );
          }}
          options={items == null || isLoading ? ['Loading...'] : [...items]}
          value={value}
        ></Autocomplete>
        <br />
        <Button style={buttonStyles} onClick={addItem}>
          Add to basket
        </Button>
        <DisplayError
          listError={duplicateError}
          formError={noItemError}
          fetchError={storeError}
        />
        <Cart store={store}></Cart>
        <Price productPayload={basket} />
        <div className="basketOutput">
          {basket.length === 0
            ? null
            : basket.map((next, index) => (
                <h3 key={index}>
                  {next.id}
                  <Button
                    value={next.id}
                    key={index}
                    onClick={() => removeItem(next.id)}
                  >
                    x
                  </Button>
                </h3>
              ))}
        </div>
        <br />
        {basket.length === 0 ? null : (
          <>
            <Button
              style={buttonStyles}
              onClick={() => {
                setBasket([]);
                setNewItem('');
                setValue('');
                setNoItemError(false);
                setDuplicateError(false);
              }}
            >
              Clear basket
            </Button>
            <br />
          </>
        )}
      </div>
      <footer>
        <p>&copy; Lachlan Bardwell 2021</p>
        <a className="logo" href="https://clearbit.com">
          Logos provided by Clearbit
        </a>
      </footer>
    </Box>
  );
};
