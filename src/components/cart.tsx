import React from 'react';

interface cartStore {
  store: string;
}

export const Cart: React.FC<cartStore> = ({ store }) => {
  return (
    <div>
      <h1 className="cartHeading">{store ? `${store} cart items:` : null}</h1>
    </div>
  );
};
