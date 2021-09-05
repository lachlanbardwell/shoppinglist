import { transformProductResponse } from '../transformers/products';
import { apiInstance } from './api-instance';

export const getItems = (storeId: string, departID: string) =>
  apiInstance
    .get('/items')
    .then((res) => transformProductResponse(res.data, storeId, departID));
