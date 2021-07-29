import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { products } from './items';

export const AddToBasket = () => {
  const [basket, setBasket] = useState([]);
  const [newItem, setNewItem] = useState('');
  const handleChange = (event, values) => {
    setNewItem(() => values);
    console.log(newItem);
  };

  useEffect(() => {
    if (basket.length === 0) {
      window.addEventListener('click', alert('CONSUME CAPATILIST GOODS'));
    }
  }, [basket]);

  const addItem = (event) => {
    event.preventDefault();
    basket.includes(newItem)
      ? console.error('duplicate detected')
      : setBasket((basket) => {
          return [...basket, newItem];
        });
    console.log(basket);
  };

  const removeItem = ({ target }) => {
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
          onChange={handleChange}
          value={newItem}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="What do you want to buy?"
              value={basket}
            ></TextField>
          )}
          // renderOption={(opt) => <React.Fragment>{opt}</React.Fragment>}
          // groupBy={(opt) => opt}
          options={[...products.produce.items, ...products.deli.items]}
        ></Autocomplete>

        <ul>
          <Button onClick={addItem}>Add an item</Button>
        </ul>
        <TextField label="basket contents:" value={basket}></TextField>
        <br></br>
        <h2>Remove items below:</h2>
        <br />
        {basket.length >= 1
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
