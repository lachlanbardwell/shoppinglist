import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { TopBar } from './components/app-bar/app-bar';
import { Footer } from './components/footer/footer';
import { MainPage } from './pages/main-page/main-page';
import { CartPage } from './pages/cart-page/cart-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { IProduct } from './types';
import { CartContext } from './context';
import './App.css';

const App: React.FC = () => {
  // document.cookie = 'sessionId' + '=' + 'value';
  // if sessionid has basket products get data from api + db, set intial state to that value
  // or if basket is empty initial = []
  // const initialState = [{}, {}, {}]
  // GET api/basket, then set initial state to that array. or []
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const calcTotal = (items: IProduct[]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const quantityArr: number[] = items.map((next) => next.quantity);
    return quantityArr.reduce((acc, b) => acc + b, 0);
  };

  return (
    <>
      <CartContext.Provider value={{ cartItems, setCartItems, calcTotal }}>
        <HashRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </HashRouter>
      </CartContext.Provider>
    </>
  );
};

export default App;
