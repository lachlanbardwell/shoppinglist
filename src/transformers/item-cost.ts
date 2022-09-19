import { IProduct } from '../types';

export const itemCostTotal = (item: IProduct): string => {
  const calc = item.quantity && item.quantity * item.price;
  return `$${calc?.toFixed(2)}`;
};
