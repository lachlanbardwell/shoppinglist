export interface IProduct {
  id: string;
  weight: number;
  color: string;
  price: number;
}

export interface IResponseData {
  [listNumber: string]: IStoreData;
}

export interface IStoreData {
  [storename: string]: IProduct[];
}
