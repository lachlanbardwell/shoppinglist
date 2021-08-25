import React, { useEffect, MouseEvent, useState, useRef } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cart } from './cart';
import { Retailer } from './retailer';
import axios from 'axios';
import { Price } from './price';
import { DisplayError } from './display-error';

export const AddToBasket: React.FC = () => {
  const [basket, setBasket] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [items, setItems] = useState<string[] | null>(null);
  const [price, setPrice] = useState<number[]>([]);
  const initialRender = useRef<boolean>(true);
  const initialStoreState = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
  const [store, setStore] = useState<string[]>(initialStoreState);
  const [listError, setListError] = useState<boolean>(false);

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
          setPrice(() => [...price, itemData.price]);
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
        setBasket((basket) => {
          return [...basket, newItem];
        });
        setListError(false);
      }
    } else {
      console.log('no item selected');
    }
    console.log(basket);
    console.log(newItem);
  };

  const removeItem = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    if (basket.includes(currentTarget.value)) {
      setBasket(basket.filter((prev) => prev !== currentTarget.value));
      setListError(false);
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
        {listError === true ? <DisplayError /> : null}
        <Cart store={store}></Cart>
        <Price price={price} />
        {newItem.length !== 0
          ? basket.map((prev, index) => (
              <h3 key={index}>
                {prev}
                <Button value={prev} key={index} onClick={removeItem}>
                  x
                </Button>
              </h3>
            ))
          : console.log('basket is empty')}
      </div>
    </Box>
  );
};
