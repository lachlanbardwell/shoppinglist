import React, { useEffect, MouseEvent, ChangeEvent, useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { products } from './items';
import { Cart } from './cart';
import { Retailer } from './retailer';

export const AddToBasket = () => {
  const [basket, setBasket] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      console.log('updating basket...');
    }, 500);
  }, [basket]);

  const addItem = () => {
    basket.includes(newItem)
      ? console.error('duplicate detected')
      : newItem.length > 0
      ? setBasket((basket) => {
          return [...basket, newItem];
        })
      : console.error('no item selected');

    // console.log(basket);
  };

  const removeItem = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    // console.log(currentTarget.value);
    basket.includes(currentTarget.value)
      ? setBasket(basket.filter((prev) => prev !== currentTarget.value))
      : console.error('no such item exists');
    // console.log(basket);
  };

  return (
    <Box>
      <div>
        <Retailer />
        <br />
        <Autocomplete
          onChange={(event, value) => {
            // console.log(value);
            value && setNewItem(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="What do you want to buy?"
              value={basket}
            ></TextField>
          )}
          options={[
            ...products.produce.items,
            ...products.deli.items,
            ...products.perishables.items,
            ...products.meat.items,
            ...products.grocery.items,
            ...products.bathroom.items,
            ...products.cleaning.items,
            ...products.freezer.items,
          ]}
        ></Autocomplete>
        <br />
        <Button className="addButton" onClick={addItem}>
          Add to basket
        </Button>

        <Cart />

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
