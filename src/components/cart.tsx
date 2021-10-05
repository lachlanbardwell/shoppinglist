import React from 'react';
import { ICartStore } from '../types';

export const Cart: React.FC<ICartStore> = ({ store }) => {
  return (
    <div>
      <h3 className="cartHeading">{store ? `${store} list items:` : null}</h3>
    </div>
  );
};
