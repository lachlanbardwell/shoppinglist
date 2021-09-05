import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  CircularProgress,
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
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [items, setItems] = useState<string[] | null>(null);
  const [listError, setListError] = useState<boolean>(false);
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
      setItems(result.map((prev: IProduct) => prev.id));
      setisLoading(false);
    } catch (error) {
      console.log(`Failed to call ${isMock ? 'mock' : 'actual'} api`);
      if (!isMock) {
        getItems(mockStoreApi, true);
      } else {
        setisLoading(false);
      }
      console.error('api call failed');
    }
  };

  console.log(availableProducts);

  useEffect(() => {
    if (!store || !depart) {
      return;
    }

    getItems(storeApi);
  }, [store, depart]);

  const addItem = () => {
    handleItemSelection(newItem);
    setNewItem('');
  };

  const removeItem = (itemToRemove: string) => {
    setBasket((prevState) =>
      prevState.filter((prevItem) => prevItem.id !== itemToRemove),
    );
  };

  const changeDepart: () => void = () => {
    depart === 'produce' ? setDepart('deli') : setDepart('produce');
  };

  const buttonStyles = {
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

  return (
    <Box>
      <div>
        <Retailer
          storeList={initialStoreState}
          store={store}
          setStore={setStore}
        />
        <br />
        {store.length === 1 ? (
          <>
            <Paper className="paperClass">
              <h2 className="cartHeading">
                Department : {depart.toUpperCase()}
              </h2>
            </Paper>
            <Button style={buttonStyles} onClick={changeDepart}>
              Change Department
            </Button>
          </>
        ) : null}
        <br />
        <Autocomplete
          autoComplete
          openOnFocus
          onChange={(event, value: string | null) => {
            if (value && value !== 'Loading...') {
              setNewItem(value);
            } else {
              setNewItem('');
            }
          }}
          onInputChange={(e, input) => {
            if (store.length > 1) {
              setValue('');
            } else {
              setValue(input);
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
          listError={listError}
          formError={formError}
          fetchError={fetchError}
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
          <Button
            style={buttonStyles}
            onClick={() => {
              setBasket([]);
              setNewItem('');
              setValue('');
              setFormError(false);
              setListError(false);
            }}
          >
            Clear basket
          </Button>
        )}
      </div>
    </Box>
  );
};
