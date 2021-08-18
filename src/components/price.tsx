import React, { useEffect, useRef, useReducer } from 'react';

interface TypePrice {
  price: number;
  // totalPrice: number;
}

export const Price: React.FC<TypePrice> = ({ price }) => {
  let priceArray: number[] = [];

  useEffect(() => {
    priceArray.push(price);
    console.log(priceArray);
    let totalPrice = priceArray.reduce((a: number, b: number) => a + b);
    console.log(totalPrice);
  }, [price]);

  return (
    <div>
      <h1 className="priceHeader">{`Total Price: $${price}`}</h1>
    </div>
  );
};
