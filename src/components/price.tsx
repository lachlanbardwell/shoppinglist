import React from 'react';
import { IProduct } from '../types';
import { ITypePrice } from '../types';

//Alternatively pass {price}. Just demoing props
export const Price: React.FC<ITypePrice> = (props) => {
  const totalPrice = () => {
    if (props.productPayload) {
      const newPrice = props.productPayload
        .reduce((total: number, next: IProduct) => total + next.price, 0)
        .toFixed(2);
      return newPrice;
    } else {
      return 0;
    }
  };

  return (
    <div className="priceHeader">
      <h3>Estimated total:</h3>
      <h1 style={{ fontSize: '40px' }}>{`$${totalPrice()}`}</h1>
    </div>
  );
};
