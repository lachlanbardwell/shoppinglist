import React from 'react';
import './App.css';
import { LachHeader } from './components/header';
import { AddToBasket } from './components/basket';
import { LachFooter } from './components/footer';

const App: React.FC = () => {
  return (
    <>
      <LachHeader />
      <AddToBasket />
      <LachFooter />
    </>
  );
};

export default App;
