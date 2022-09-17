import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TopBar } from './components/app-bar/app-bar';
import { LachFooter } from './components/footer';
import { MainPage } from './pages/main-page';
import { CartPage } from './pages/cart-page';
import { NotFoundPage } from './pages/not-found-page';
import { IProduct } from './types';
import './App.css';
import { CartContext } from './context';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  return (
    <>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <BrowserRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <LachFooter />
        </BrowserRouter>
      </CartContext.Provider>
    </>
  );
};

export default App;
