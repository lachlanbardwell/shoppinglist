import React from 'react';
import { IProduct } from '../types';
import { ITypePrice } from '../types';

export const Price: React.FC<ITypePrice> = (props) => {
  const totalPrice = () => {
    if (props.productPayload) {
      const newPrice = props.productPayload
        .reduce(
          (total: number, next: IProduct) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            total + next.price * next?.quantity,
          0,
        )
        .toFixed(2);
      return newPrice;
    } else {
      return 0;
    }
  };
  return (
    <div className="priceHeader">
      <h3>Total Cost:</h3>
      <h1
        style={{
          fontSize: '40px',
          margin: 'auto',
        }}
      >{`$${totalPrice()}`}</h1>
    </div>
  );
};
