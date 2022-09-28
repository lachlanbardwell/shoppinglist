import React, { useContext, useEffect, useState } from 'react';
import { BasketOutput } from '../basket-output/basket-output';
import { CartContext } from '../../context/context';
import { CartInfo } from '../cart-info/cart-info';
import { Department } from '../depart/depart';
import { DisplayError } from '../display-error/display-error';
import { Retailer } from '../retailer/retailer';
import { IErrorStates, IHeaderCheck, IProduct } from '../../types';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import * as storeApi from '../../api/store-api';
import * as mockStoreApi from '../../api/mocks/mock-store-api';
import './basket.css';

const initialStoreState: string[] = ['Woolworths', 'Coles', 'Aldi', 'IGA'];

//Alternate typing of functional component - Using ReactFC means it Must accept a children prop of some kind
export const AddToBasket = (props: IHeaderCheck): JSX.Element => {
  const [availableProducts, setAvailableProducts] = useState<IProduct[]>([]);
  const [depart, setDepart] = useState<string>('produce');
  const [error, setError] = useState<IErrorStates>({
    noItem: false,
    duplicate: false,
  });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [items, setItems] = useState<string[] | null>(null);
  const [newItem, setNewItem] = useState<string>('');
  const [store, setStore] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const { cartItems, setCartItems } = useContext(CartContext);

  //TODO : Remove use of mocks after backend is sorted
  // First attempt backend api call, otherwise call from mock api
  const getItems = async (service: typeof storeApi, isMock?: boolean) => {
    setisLoading(true);
    try {
      const result = await service.retrieveItems(store, depart);
      setAvailableProducts(result);
      setItems(result.map((prev: IProduct) => prev.id).sort());
      setisLoading(false);
    } catch (error) {
      console.log(`Failed to call ${isMock ? 'mock' : 'actual'} API`);
      if (!isMock) {
        getItems(mockStoreApi, true);
        console.log('Called mock API');
      } else {
        setisLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!store || !depart) {
      return;
    }
    setError({ noItem: false, duplicate: false });
    getItems(storeApi);
    props.setCheckClicked(true);
  }, [store, depart]);

  useEffect(() => {
    if (!store) {
      setNewItem('');
      setAvailableProducts([]);
      setItems(null);
      setValue('');
      setError({ noItem: false, duplicate: false });
      props.setCheckClicked(false);
    }
  }, [store]);

  const addItem = () => {
    if (cartItems.find((next) => next.id === newItem)) {
      setError({ noItem: false, duplicate: true });
      setNewItem('');
      return;
    }
    if (!newItem) {
      setError({ noItem: true, duplicate: false });
      return;
    }
    addToBasket(newItem);
    setError({ noItem: false, duplicate: false });
    setNewItem('');
  };

  const removeFromBasket = (itemToRemove: string) => {
    setCartItems((prevState: IProduct[]) => {
      return prevState.filter((prevItem) => prevItem.id !== itemToRemove);
    });
    //remove users selection from db
    setError({ noItem: false, duplicate: false });
  };

  const addToBasket = (nextItem: string) => {
    const selection = availableProducts.find((next) => next.id === nextItem);
    if (!selection) {
      console.error(`Could not find item: ${nextItem}`);
      return;
    }
    if (depart === 'produce' || depart === 'deli' || depart === 'meat') {
      selection.perkg = true;
    }
    selection.quantity = 1;
    setCartItems((prev: IProduct[]) => [...prev, selection]);
    //put users selection into basket in db
  };

  const changeQuantity = (item: IProduct, operator: string) => {
    if (!item.quantity) {
      item.quantity = 0;
    }
    const newCartArray: IProduct[] = [...cartItems];
    const itemIndex = cartItems.findIndex((match) => item.id === match.id);
    newCartArray[itemIndex] = {
      id: item.id,
      weight: item.weight,
      color: item.color,
      price: item.price,
      perkg: item.perkg,
      quantity: operator === 'add' ? item.quantity + 1 : item.quantity - 1,
    };
    if (newCartArray.find((match) => match.quantity == 0)) return;
    setCartItems(newCartArray);
  };

  return (
    <Box>
      <div id="boxStyles">
        <Retailer
          storeList={initialStoreState}
          store={store}
          setStore={setStore}
        />
        {props.clicked && (
          <>
            <Department depart={depart} setDepart={setDepart} />
            <Autocomplete
              className="autoClass"
              autoComplete
              onMouseDownCapture={(e) => e.stopPropagation()}
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
              options={
                items === null || isLoading ? ['Loading...'] : [...items]
              }
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    disabled={isLoading}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: isLoading ? (
                        <CircularProgress
                          style={{
                            marginTop: -20,
                            marginRight: -40,
                            color: 'black',
                          }}
                          size={25}
                        />
                      ) : (
                        params.InputProps.endAdornment
                      ),
                    }}
                    variant="filled"
                    label={
                      isLoading ? 'Loading...' : 'What do you want to buy?'
                    }
                    value={cartItems}
                  ></TextField>
                );
              }}
              value={value}
            ></Autocomplete>
            <Button className="add-to-cart" onClick={addItem}>
              <AddIcon />
              &nbsp; Add to cart
            </Button>
            <DisplayError error={error} />
            <BasketOutput
              changeQuantity={changeQuantity}
              removeItem={removeFromBasket}
            />
            {cartItems.length > 0 && <CartInfo setNewItem={setNewItem} />}
          </>
        )}
      </div>
    </Box>
  );
};
