import React from 'react';
import { IProduct } from '../models';

interface TypePrice {
  productPayload: IProduct[];
}

const priceStyles: React.CSSProperties = {
  color: 'darkblue',
  display: 'flex',
};

//Alternatively pass {price}. Just demoing props
export const Price: React.FC<TypePrice> = (props) => {
  const totalPrice = () => {
    if (props.productPayload.length >= 1) {
      let newPrice = props.productPayload
        .reduce((total: number, next: IProduct) => total + next.price, 0)
        .toFixed(2);
      return newPrice;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <h2
        className="priceHeader"
        style={priceStyles}
      >{`Total Price: $${totalPrice()}`}</h2>
    </div>
  );
};
