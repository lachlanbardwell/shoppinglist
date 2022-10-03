export interface IBasketOutput {
  changeQuantity: (item: IProduct, operator: string) => void;
  removeItem: (itemToRemove: string, itemFromStore: string) => void;
}

export interface ICartInfo {
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
}

export interface ICartStore {
  store: string;
}

export interface IContextProps {
  cartItems: IProduct[];
  setCartItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
  calcTotal: (items: IProduct[]) => number;
}
export interface IDepart {
  depart: string;
  setDepart: (depart: string) => void;
  filter: (type: string) => void;
  categories: string[];
  currentCategory: string;
}
export interface IErrorStates {
  noItem: boolean;
  duplicate: boolean;
  otherStore: boolean;
}
export interface IErrorDisplay {
  error: IErrorStates;
  setError: React.Dispatch<React.SetStateAction<IErrorStates>>;
  newItem: string;
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
  addToBasket: (nextItem: string) => void;
}

export interface IHeaderCheck {
  clicked: boolean;
  setCheckClicked: (clicked: boolean) => void;
}
export interface IProduct {
  id: string;
  tag: string;
  weight: number;
  color: string;
  price: number;
  perkg?: boolean;
  quantity?: number;
  store?: string;
  type: string;
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
export interface IFlickrData {
  tag: string;
  serverId: number;
  id: number;
  secret: string;
}

export interface IInfoModal {
  setInfoClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
