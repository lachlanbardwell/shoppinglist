import React, { useMemo } from 'react';

interface TypePrice {
  price: number[];
}

const priceStyles: React.CSSProperties = {
  color: 'darkblue',
  // background: '#e9e9e9',
  display: 'flex',
};

//Alternatively pass {price}. Just demoing props
export const Price: React.FC<TypePrice> = (props) => {
  const totalPrice = useMemo(() => {
    if (props.price.length > 1) {
      let newPrice = props.price
        .reduce((a: number, b: number) => a + b)
        .toFixed(2);
      return newPrice;
    } else if (props.price.length === 1) {
      return props.price;
    } else {
      return 0;
    }
  }, [props.price]);

  return (
    <div>
      <h2
        className="priceHeader"
        style={priceStyles}
      >{`Total Price: $${totalPrice}`}</h2>
    </div>
  );
};
