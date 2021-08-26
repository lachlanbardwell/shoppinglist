import React, { useEffect, MouseEvent, useState, useRef } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cart } from './cart';
import { Retailer } from './retailer';
import axios from 'axios';
import { Price } from './price';
import { DisplayError } from './display-error';
import { IProduct } from '../models';
// import configData from '../config.js';
// configData.SERVER_URL

export const AddToBasket: React.FC = () => {
  const [basket, setBasket] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [items, setItems] = useState<string[] | null>(null);
  const [productPayload, setProductPayload] = useState<IProduct[]>([]);
  const initialRender = useRef<boolean>(true);
  const initialStoreState = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
  const [store, setStore] = useState<string[]>(initialStoreState);
  const [listError, setListError] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);

  useEffect(() => {
    // if (items == null) {
    //   return;
    // }
    setTimeout(() => {
      initialRender.current
        ? (initialRender.current = false)
        : console.log('updating basket...');
    }, 100);
  }, [basket]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/items')
      .then((res) => {
        let wwArray = res.data[0].woolWorths.produce;

        if (newItem) {
          let itemData = wwArray.find((prev: any) => prev.id === newItem);
          !itemData
            ? console.error('item not found in data fetch')
            : setProductPayload(() => [...productPayload, itemData]);
        }
        let wwSecondArray = wwArray.map((prev: string[]) =>
          Object.values(prev),
        );
        let wwOptions = wwSecondArray.map(
          (prev: any) => Object.values(prev)[0],
        );
        setItems(() => {
          return [...wwOptions];
        });
      })
      .catch((error) => {
        setItems([]);
        console.error(error);
      });
  }, [basket]);

  const addItem = () => {
    if (newItem.length > 0) {
      if (basket.includes(newItem)) {
        setListError(true);
      } else {
        setFormError(false);
        setBasket((basket) => {
          return [...basket, newItem];
        });
        setListError(false);
      }
    } else {
      setFormError(true);
    }
  };

  const removeItem = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    if (basket.includes(currentTarget.value)) {
      setNewItem('');
      setFormError(false);
      setBasket((prev) => prev.filter((item) => item !== currentTarget.value));
      setListError(false);
      setProductPayload((prev) => {
        const result = prev.filter((product) => {
          console.log(product, currentTarget.value);
          return product.id !== currentTarget.value;
        });
        return result;
      });
    } else {
      console.error('no such item exists');
    }
  };

  const selectStore = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    if (store.length > 1) {
      setStore(store.filter((prev) => prev === currentTarget.value));
    } else {
      setStore(initialStoreState);
    }
  };

  return (
    <Box>
      <div>
        <Retailer store={store} selectStore={selectStore} />
        <br />
        {store.length === 1 ? (
          <>
            <Autocomplete
              onChange={(event, value: string | null) => {
                value && value !== 'loading...'
                  ? setNewItem(value)
                  : setNewItem('');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="What do you want to buy?"
                  value={basket}
                ></TextField>
              )}
              options={items == null ? ['loading...'] : [...items]}
            ></Autocomplete>

            <br />
            <Button className="addButton" onClick={addItem}>
              Add to basket
            </Button>
            <DisplayError listError={listError} formError={formError} />
            <Cart store={store}></Cart>
            <Price productPayload={productPayload} />
          </>
        ) : null}
        {productPayload.length === 0
          ? null
          : productPayload.map((prev, index) => (
              <h3 key={prev.id}>
                {prev.id}
                <Button value={prev.id} key={prev.id} onClick={removeItem}>
                  x
                </Button>
              </h3>
            ))}
      </div>
    </Box>
  );
};
