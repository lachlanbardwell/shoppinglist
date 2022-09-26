import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Retailer } from '../retailer';
import { Price } from '../price';
import { DisplayError } from '../display-error/display-error';
import { IHeaderCheck, IProduct } from '../../types';
import { Department } from '../depart/depart';
import { CartContext } from '../../context';
import { Link } from 'react-router-dom';
import { itemCostTotal } from '../../transformers/item-cost';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InputIcon from '@material-ui/icons/Input';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as storeApi from '../../api/store-api';
import * as mockStoreApi from '../../api/mocks/mock-store-api';
import './basket.css';

const initialStoreState: string[] = ['Woolworths', 'Coles', 'Aldi', 'IGA'];

//Alternate typing of functional component - Using ReactFC means it Must accept a children prop of some kind
export const AddToBasket = (props: IHeaderCheck): JSX.Element => {
  const [availableProducts, setAvailableProducts] = useState<IProduct[]>([]);
  const [depart, setDepart] = useState<string>('produce');
  const [storeError, setStoreError] = useState<boolean>(false);
  const [noItemError, setNoItemError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [items, setItems] = useState<string[] | null>(null);
  const [duplicateError, setDuplicateError] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  const [store, setStore] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const { cartItems, setCartItems, calcTotal } = useContext(CartContext);

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
    setDuplicateError(false);
    setNoItemError(false);
    getItems(storeApi);
    props.setCheckClicked(true);
  }, [store, depart]);

  useEffect(() => {
    if (!store) {
      setNewItem('');
      setAvailableProducts([]);
      setCartItems([]);
      setItems(null);
      setValue('');
      setDuplicateError(false);
      setNoItemError(false);
      props.setCheckClicked(false);
    }
    setStoreError(false);
  }, [store]);

  const addItem = () => {
    if (!store) {
      setStoreError(true);
      return;
    }
    if (cartItems.find((next) => next.id === newItem)) {
      setDuplicateError(true);
      setNewItem('');
      return;
    }
    if (!newItem) {
      setNoItemError(true);
      return;
    }
    addToBasket(newItem);
    setNoItemError(false);
    setDuplicateError(false);
    setNewItem('');
  };

  const removeFromBasket = (itemToRemove: string) => {
    setCartItems((prevState: IProduct[]) => {
      return prevState.filter((prevItem) => prevItem.id !== itemToRemove);
    });
    //remove users selection from db
    setNoItemError(false);
    setDuplicateError(false);
  };

  const addToBasket = (nextItem: string) => {
    const selection = availableProducts.find((next) => next.id === nextItem);

    if (!selection) {
      console.error('Could not find next item', nextItem);
      return;
    }
    if (depart === 'produce' || depart === 'deli' || depart === 'meat') {
      selection.perkg = true;
    }
    selection.quantity = 1;
    setCartItems((prev: IProduct[]) => [...prev, selection]);
    //put users selection into basket in db
  };

  const convertDepart = (inputDepart: string) => {
    return (
      inputDepart.substring(0, 1).toUpperCase() + inputDepart.substring(1) + ' '
    );
  };

  const addQuantity = (item: IProduct) => {
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
      quantity: item.quantity + 1,
    };
    setCartItems(newCartArray);
  };

  const removeQuantity = (item: IProduct) => {
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
      quantity: item.quantity - 1,
    };
    if (newCartArray.find((match) => match.quantity == 0)) return;
    setCartItems(newCartArray);
  };

  return (
    <Box className="muiDiv">
      <div id="boxStyles">
        <Retailer
          storeList={initialStoreState}
          store={store}
          setStore={setStore}
        />

        {store ? (
          <>
            <div className="departClass">
              <Department
                depart={depart}
                setDepart={setDepart}
                convert={convertDepart}
              ></Department>
              <Paper className="paperClass">
                <h3 className="cartHeading">
                  {convertDepart(depart)}
                  Department
                </h3>
              </Paper>
            </div>
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
              options={items == null || isLoading ? ['Loading...'] : [...items]}
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
                              style={{
                                marginTop: -20,
                                marginRight: -40,
                                color: 'black',
                              }}
                              size={20}
                            />
                          ) : (
                            params.InputProps.endAdornment
                          )}
                        </>
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
            <Button className="utilBtn" onClick={addItem}>
              <AddIcon />
              &nbsp; Add to basket
            </Button>
          </>
        ) : null}
        <DisplayError
          listError={duplicateError}
          formError={noItemError}
          fetchError={storeError}
        />

        <div className="basketOutput">
          {cartItems.length === 0
            ? null
            : cartItems.map((next, index) => (
                <Paper key={index} className="basketItems">
                  <span className="basketItemNames">
                    <p>{next.id}</p>
                    <p className="basketItemPrice">{`$${next.price.toFixed(
                      2,
                    )} ${next.perkg ? 'per kg' : 'ea'}`}</p>
                  </span>
                  <span className="basket-quantity">
                    <Avatar
                      className="basket-minus"
                      onClick={() => removeQuantity(next)}
                      style={{
                        backgroundColor: 'black',
                        margin: 'auto',
                        width: 18,
                        height: 18,
                      }}
                    >
                      -
                    </Avatar>
                    &nbsp;
                    <Avatar
                      className="basket-quantity-count"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid black',
                        color: 'black',
                        width: 26,
                        height: 26,
                      }}
                    >
                      {next.quantity}
                    </Avatar>
                    &nbsp;
                    <Avatar
                      className="basket-plus"
                      onClick={() => addQuantity(next)}
                      style={{
                        backgroundColor: 'black',
                        margin: 'auto',
                        width: 18,
                        height: 18,
                      }}
                    >
                      +
                    </Avatar>
                    <p className="item-total">{itemCostTotal(next)}</p>
                  </span>
                  <span
                    className="removeBtn"
                    onClick={() => removeFromBasket(next.id)}
                  >
                    <CloseIcon className="close" />
                  </span>
                </Paper>
              ))}
        </div>
        {cartItems.length > 0 && (
          <div
            className="infoOutput"
            style={{ fontFamily: 'Play, sans-serif' }}
          >
            <Button
              className="utilBtn"
              onClick={() => {
                setCartItems([]);
                setNewItem('');
                setValue('');
                setNoItemError(false);
                setDuplicateError(false);
              }}
            >
              <DeleteForeverIcon />
              &nbsp; Clear basket
            </Button>
            {store && <Price productPayload={cartItems} />}
            <span className="checkout">
              <h3>Checkout</h3>
              <Link to={'/cart'} style={{ display: 'flex', color: 'black' }}>
                <Badge
                  badgeContent={calcTotal(cartItems)}
                  color="secondary"
                  overlap="rectangular"
                  showZero
                >
                  <ShoppingCartIcon style={{ fontSize: '60px' }} />
                </Badge>
                <InputIcon
                  style={{
                    fontSize: '30px',
                    marginTop: 'auto',
                  }}
                />
              </Link>
            </span>
          </div>
        )}
      </div>
    </Box>
  );
};
