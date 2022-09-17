export interface ICartStore {
  store: string;
}
export interface IDepart {
  depart: string;
  setDepart: (depart: string) => void;
  convert: (depart: string) => string;
}

export interface IHeaderCheck {
  clicked: boolean;
  setCheckClicked: (clicked: boolean) => void;
}

export interface IErrorDisplay {
  listError: boolean;
  formError: boolean;
  fetchError: boolean;
}
export interface IProduct {
  id: string;
  weight: number;
  color: string;
  price: number;
  perkg?: boolean;
}

export interface IContextProps {
  cartItems: IProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
export interface IResponseData {
  [listNumber: string]: IStoreData;
}
export interface IRetailerStore {
  store: string;
  storeList: string[];
  setStore: (nextStore: string) => void;
}
export interface IStoreData {
  [storename: string]: IProduct[];
}

export interface ITypePrice {
  productPayload: IProduct[];
}
