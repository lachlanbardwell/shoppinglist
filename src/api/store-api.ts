import { transformProductResponse } from '../transformers/products';
import { apiInstance } from './api-instance';
import { IProduct } from '../models';

export const retrieveItems: (
  storeId: string,
  departID: string,
) => Promise<IProduct[]> = (storeId: string, departID: string) =>
  apiInstance
    .get('/items')
    .then((res) => transformProductResponse(res.data, storeId, departID))
    .catch((error) => {
      throw new Error(error);
    });
