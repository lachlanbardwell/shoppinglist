import React from 'react';
import { IProduct } from '../models';

interface TypePrice {
  productPayload: IProduct[];
}

const priceStyles: React.CSSProperties = {
  color: '#0e0e42',
  display: 'flex',
  marginLeft: '10px',
};

//Alternatively pass {price}. Just demoing props
export const Price: React.FC<TypePrice> = (props) => {
  const totalPrice = () => {
    if (props.productPayload.length >= 1) {
      const newPrice = props.productPayload
        .reduce((total: number, next: IProduct) => total + next.price, 0)
        .toFixed(2);
      return newPrice;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <h3
        className="priceHeader"
        style={priceStyles}
      >{`Estimated total: $${totalPrice()}`}</h3>
    </div>
  );
};
