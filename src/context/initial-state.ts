import { IProduct } from '../types';

export const initialUserState: () => IProduct[] = () => {
  const stored = JSON.parse(sessionStorage.getItem('User State') as string);
  return stored ? stored : [];
};
