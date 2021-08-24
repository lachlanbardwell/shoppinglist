import React, { useMemo } from 'react';

interface TypePrice {
  price: number[];
}

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
      <h2 className="priceHeader">
        {`Total Price: $${totalPrice}`}Way 2 expensive
      </h2>
    </div>
  );
};
