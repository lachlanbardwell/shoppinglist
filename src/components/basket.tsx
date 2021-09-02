import React, { useEffect, useState } from 'react';
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
  const initialStoreState: string[] = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
  const [store, setStore] = useState<string[]>(initialStoreState);
  const [listError, setListError] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (store.length !== 1) {
      return;
    }
    axios
      .get('http://localhost:3001/items')
      .then(
        (res) => {
          let yep = res.data;
          console.log(yep);
          console.log(yep[0]);
          console.log(yep[0]['Woolworths']);
        },
        (reject) => console.error(reject),
      )
      .catch((error) => console.error(error));
  }, [store]);

  useEffect(() => {
    if (store.length > 1) {
      setNewItem('');
      setProductPayload([]);
      setBasket([]);
      setItems(null);
      setValue('');
    }
  }, [store]);

  useEffect(() => {
    if (store.length !== 1) {
      if (items == null) {
        return;
      }
      setFetchError(true);
      return;
    }
    setFetchError(false);
    axios
      .get(`http://localhost:3001/items`)
      .then((res) => {
        let wwArray = res.data[0].Woolworths.produce;

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
          (prev: IProduct) => Object.values(prev)[0],
        );
        // .sort((itemOne: IProduct, itemTwo: IProduct) => {
        //   console.log(itemOne, itemTwo);
        //   return itemOne.id.localeCompare(itemTwo.id);
        // });
        setItems(() => {
          return [...wwOptions];
        });
      })
      .catch((error) => {
        setItems([]);
        console.error(error);
      });
  }, [basket, store]);

  const addItem = () => {
    if (store.length !== 1) {
      setFetchError(true);
      setNewItem('');
      return;
    }
    if (newItem.length > 0) {
      setFetchError(false);
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
      setValue('');
      setProductPayload((prev) => {
        const result = prev.filter((product) => {
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
      setProductPayload([]);
    } else {
      setStore(initialStoreState);
      setFormError(false);
      setListError(false);
    }
  };

  const buttonStyles = {
    color: 'white',
    backgroundColor: '#282c34',
  };

  return (
    <Box>
      <div>
        <Retailer store={store} onChange={selectStore} />
        <br />

        <Autocomplete
          onChange={(event, value: string | null) => {
            value && value !== 'loading...'
              ? setNewItem(value)
              : setNewItem('');
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
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="What do you want to buy?"
              value={basket}
            ></TextField>
          )}
          options={items == null ? ['loading...'] : [...items]}
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
        <Price productPayload={productPayload} />
        <div className="basketOutput">
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
        <br />
        {productPayload.length === 0 ? null : (
          <Button
            style={buttonStyles}
            onClick={() => {
              setBasket(['']);
              setProductPayload([]);
              setNewItem('');
              setValue('');
            }}
          >
            Clear basket
          </Button>
        )}
      </div>
    </Box>
  );
};
