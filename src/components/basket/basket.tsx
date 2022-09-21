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
import { DisplayError } from '../display-error';
import { IHeaderCheck, IProduct } from '../../types';
import * as storeApi from '../../api/store-api';
import * as mockStoreApi from '../../api/mocks/mock-store-api';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Department } from '../depart';
import { CartContext } from '../../context';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InputIcon from '@material-ui/icons/Input';
import './basket.css';
import { Link } from 'react-router-dom';
import { itemCostTotal } from '../../transformers/item-cost';

const initialStoreState: string[] = ['Woolworths', 'Coles', 'Aldi', 'IGA'];
const useStyles = makeStyles({
  circularProgress: {
    marginTop: -20,
    marginRight: -40,
  },
});

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const { cartItems, setCartItems } = useContext(CartContext);
  const classes = useStyles();

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
    handleItemSelection(newItem);
    setNoItemError(false);
    setDuplicateError(false);
    setNewItem('');
  };

  const removeItem = (itemToRemove: string) => {
    setCartItems((prevState: IProduct[]) => {
      return prevState.filter((prevItem) => prevItem.id !== itemToRemove);
    });
    setNoItemError(false);
    setDuplicateError(false);
  };

  const handleItemSelection = (nextItem: string) => {
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
  };

  const handleInputChange = (
    event: React.ChangeEvent<Record<string, never>>,
    newInputValue: string,
  ) => {
    setSearchValue(newInputValue);
    if (newInputValue.length > 0) {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
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
    console.log(newCartArray);
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
            <br />
            <Autocomplete
              className="autoClass"
              autoComplete
              inputValue={searchValue}
              open={searchOpen}
              onOpen={() => searchValue.length > 0 && setSearchOpen(true)}
              onClose={() => setSearchOpen(false)}
              onInputChange={handleInputChange}
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
                              className={classes.circularProgress}
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
              options={items == null || isLoading ? ['Loading...'] : [...items]}
              value={value}
            ></Autocomplete>
            <br />
            <Button className="utilBtn" onClick={addItem}>
              Add to basket
            </Button>{' '}
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
                  </span>
                  <p>{itemCostTotal(next)}</p>
                  <Button
                    className="removeBtn"
                    value={next.id}
                    key={index}
                    onClick={() => removeItem(next.id)}
                  >
                    <CloseIcon className="close" />
                  </Button>
                </Paper>
              ))}
        </div>
        {cartItems.length > 0 && (
          <div className="infoOutput">
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
              Clear basket
            </Button>
            {store && <Price productPayload={cartItems} />}
            <span className="checkout">
              <h3>Checkout</h3>
              <Link to={'/cart'} style={{ display: 'flex' }}>
                <Badge
                  badgeContent={cartItems.length}
                  // anchorOrigin={{
                  //   vertical: 'top',
                  //   horizontal: 'left',
                  // }}
                  color="secondary"
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
