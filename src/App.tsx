import React from 'react';
import { useState } from 'react';
import './App.css';
import { LachFooter } from './components/footer';
import { TopBar } from './components/app-bar/app-bar';
import { CartItems } from './context';
import { MainPage } from './pages/main-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartPage } from './pages/cart-page';
import { NotFoundPage } from './pages/not-found-page';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<[]>([]);

  //   const addCartItem = (item) => {
  // setCartItems(() => {

  // })
  //   }

  //   const removeCartItem = () => {

  //   }

  return (
    <>
      {/* <CartItems.Provider value={{cartItems, addCartItem, removeCartItem}}> */}
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <LachFooter />
      </BrowserRouter>
      {/* </CartItems.Provider> */}
    </>
  );
};

export default App;
