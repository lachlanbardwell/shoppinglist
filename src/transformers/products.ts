import { IProduct, IResponseData, IStoreData } from '../types';

export const transformProductResponse: (
  newData: IResponseData[],
  storeId: string,
  departID: string,
) => IProduct[] = (
  newData: IResponseData[],
  storeId: string,
  departID: string,
): IProduct[] => {
  // ?. Operator reads storeId within connected object, without needing to
  // use a reduce function
  const storeArray: IStoreData | undefined = newData.find(
    (obj) => obj[storeId],
  )?.[storeId];

  return (storeArray as unknown as IStoreData)[departID];
};
