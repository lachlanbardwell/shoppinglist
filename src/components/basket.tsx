import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Paper } from '@material-ui/core';
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
  const [store, setStore] = useState<string[] | any>(initialStoreState);
  const [listError, setListError] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [depart, setDepart] = useState<string>('produce');

  useEffect(() => {
    if (store.length !== 1) {
      return;
    }
    axios
      .get<any[]>('http://localhost:3001/items')
      .then(
        (res) => {
          let yep = res.data;
          console.log(yep);
          const newObject = yep.reduce(
            (acc: any, retail: any) => ({
              ...acc,
              ...retail,
            }),
            {},
          );
          console.log(newObject);
          console.log(newObject[store]);

          let yada = newObject[store];

          for (const yoko in yada) {
            if (yoko === 'produce') {
              console.log(newObject[store].produce);
            }
            if (yoko === 'deli') {
              console.log(newObject[store].deli);
            }
          }

          // const newNewObject = Object.values(newObject);
          // console.log(newNewObject);
          // const threeObject: any = newNewObject.reduce(
          //   (acc: any, department: any) => {
          //     return { ...acc, ...department };
          //   },
          //   {},
          // );
          // console.log(threeObject);
          // const selectedDepartment = Object.keys(threeObject);
          // console.log(selectedDepartment);
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
      //Type any[] as reduce is not supported
      .get<any[]>(`http://localhost:3001/items`)
      .then((res) => {
        const newData = res.data;
        //Reduce array of objects
        const newObject = newData.reduce(
          //Shorthand return
          (acc: any, retail: any) => ({
            ...acc,
            ...retail,
          }),
          {},
        );

        let retailArray = newObject[store];
        // How to use AS keyword
        let storeArray: any;

        if (!depart) {
          console.error('no department');
        }

        if (newItem) {
          let itemData = retailArray[depart].find(
            (prev: any) => prev.id === newItem,
          );
          !itemData
            ? console.error('item not found in data fetch')
            : setProductPayload(() => [...productPayload, itemData]);
        }
        let produceArray = retailArray[depart].map((prev: string[]) =>
          Object.values(prev),
        );
        let itemOptions = produceArray.map(
          (prev: IProduct) => Object.values(prev)[0],
        );
        // .sort((itemOne: IProduct, itemTwo: IProduct) => {
        //   console.log(itemOne, itemTwo);
        //   return itemOne.id.localeCompare(itemTwo.id);
        // });
        setItems(() => {
          return [...itemOptions];
        });
      })
      .catch((error) => {
        setItems([]);
        console.error(error);
      });
  }, [basket, store, depart]);

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
      setStore(store.filter((prev: any) => prev === currentTarget.value));
      setProductPayload([]);
    } else {
      setStore(initialStoreState);
      setFormError(false);
      setListError(false);
    }
  };

  const changeDepart: () => void = () => {
    depart === 'produce' ? setDepart('deli') : setDepart('produce');
  };

  const buttonStyles = {
    color: 'white',
    backgroundColor: '#282c34',
    display: 'flex',
  };

  return (
    <Box>
      <div>
        <Retailer store={store} onChange={selectStore} />
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
                <h3 key={index}>
                  {prev.id}
                  <Button value={prev.id} key={index} onClick={removeItem}>
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
