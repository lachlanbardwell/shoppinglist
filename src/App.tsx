import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TopBar } from './components/app-bar/app-bar';
import { Footer } from './components/footer/footer';
import { MainPage } from './pages/main-page/main-page';
import { CartPage } from './pages/cart-page/cart-page';
import { NotFoundPage } from './pages/not-found-page';
import { IProduct } from './types';
import { CartContext } from './context';
import './App.css';

const App: React.FC = () => {
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
        <BrowserRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartContext.Provider>
    </>
  );
};

export default App;
