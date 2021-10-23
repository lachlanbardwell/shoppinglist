import React from 'react';
import './App.css';
import { LachHeader } from './components/header';
import { AddToBasket } from './components/basket';
import { LachFooter } from './components/footer';
import { TopBar } from './components/app-bar';

const App: React.FC = () => {
  return (
    <>
      <TopBar />
      <LachHeader />
      <AddToBasket />
      <LachFooter />
    </>
  );
};

export default App;
