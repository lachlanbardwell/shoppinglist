import { IProduct, IResponseData, IStoreData } from '../models';

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

  //non-null assertion operator !
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return storeArray![departID];
};
