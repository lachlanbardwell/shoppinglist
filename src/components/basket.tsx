import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { products } from './items';

export const AddToBasket = () => {
  const [basket, setBasket] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  // useEffect(() => {
  //   basket.length === 0
  //     ? alert('CONSUME CAPITALIST GOODS')
  //     : console.log('it begins...');
  // }, [basket]);

  const addItem = () => {
    basket.includes(newItem)
      ? console.error('duplicate detected')
      : newItem.length > 0
      ? setBasket((basket) => {
          return [...basket, newItem];
        })
      : console.error('no item selected');
    console.log(basket);
  };

  const removeItem = ({ target }: any) => {
    console.log(target.innerHTML);
    basket.includes(target.innerHTML)
      ? setBasket(basket.filter((prev) => prev !== target.innerHTML))
      : console.error('no such item exists');
    console.log(basket);
  };

  return (
    <Box>
      <div>
        <Autocomplete
          onChange={({ target }: any) => setNewItem(target.innerHTML)}
          value={newItem}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="What do you want to buy?"
              value={basket}
            ></TextField>
          )}
          options={[...products.produce.items, ...products.deli.items]}
        ></Autocomplete>

        <ul>
          <Button onClick={addItem}>Add to basket</Button>
        </ul>

        <h2>Basket contents:</h2>
        <br />
        {newItem.length !== 0
          ? basket.map((prev) => (
              <Button value={prev} onClick={removeItem} key={prev}>
                {prev}
              </Button>
            ))
          : console.log('basket is empty')}
      </div>
    </Box>
  );
};
