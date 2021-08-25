import React, { useMemo } from 'react';
import { IProduct } from '../models';

interface TypePrice {
  productPayload: IProduct[];
}

const priceStyles: React.CSSProperties = {
  color: 'darkblue',
  // background: '#e9e9e9',
  display: 'flex',
};

//Alternatively pass {price}. Just demoing props
export const Price: React.FC<TypePrice> = (props) => {
  const totalPrice = () => {
    if (props.productPayload.length > 1) {
      let newPrice = props.productPayload
        .reduce((total: number, next: IProduct) => total + next.price, 0)
        .toFixed(2);
      return newPrice;
    } else if (props.productPayload.length === 1) {
      return props.productPayload[0].price;
    } else if (props.productPayload.length === 0) {
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
