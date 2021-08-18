import React, { useEffect, MouseEvent, useState, useRef } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Cart } from './cart';
import { Retailer } from './retailer';
import axios from 'axios';
import { Price } from './price';

export const AddToBasket: React.FC = () => {
  const [basket, setBasket] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [items, setItems] = useState<string[] | null>(null);
  const [price, setPrice] = useState<number>(0);
  const initialRender = useRef<boolean>(true);

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
        let wwSecondArray = wwArray.map((prev: string[]) =>
          Object.values(prev),
        );
        let wwOptions = wwSecondArray.map(
          (prev: any) => Object.values(prev)[0],
        );
        setItems(() => {
          return [...wwOptions];
        });
        let wwPrices = wwSecondArray.filter((prev: any) =>
          prev.includes(newItem),
        );
        newItem
          ? setPrice(() => {
              return wwPrices[0][3];
            })
          : console.log('current price is 0');
      })
      .catch((error) => {
        setItems([]);
        console.error(error);
      });
  }, [basket]);

  const addItem = () => {
    if (newItem.length > 0) {
      basket.includes(newItem)
        ? console.error('duplicate detected')
        : setBasket((basket) => {
            return [...basket, newItem];
          });
    } else {
      console.log('no item selected');
    }
    console.log(newItem);
    console.log(price);
  };

  const removeItem = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    basket.includes(currentTarget.value)
      ? setBasket(basket.filter((prev) => prev !== currentTarget.value))
      : console.error('no such item exists');
  };

  return (
    <Box>
      <div>
        <Retailer />
        <br />
        <Autocomplete
          onChange={(event, value: string | null) => {
            value && value !== 'loading...'
              ? setNewItem(value)
              : setNewItem('');
            console.log(newItem);
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

        <Cart></Cart>
        <Price price={price} />
        {newItem.length !== 0
          ? basket.map((prev) => (
              <h3 key={prev}>
                {prev}
                <Button value={prev} key={prev} onClick={removeItem}>
                  x
                </Button>
              </h3>
            ))
          : console.log('basket is empty')}
      </div>
    </Box>
  );
};
