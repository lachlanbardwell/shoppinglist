import React from 'react';
import { useState } from 'react';
import './App.css';
import { LachHeader } from './components/header';
import { AddToBasket } from './components/basket';
import { LachFooter } from './components/footer';
import { TopBar } from './components/app-bar/app-bar';

const App: React.FC = () => {
  const [checkClicked, setCheckClicked] = useState<boolean>(false);
  return (
    <>
      <TopBar />
      <LachHeader clicked={checkClicked} setCheckClicked={setCheckClicked} />
      <AddToBasket clicked={checkClicked} setCheckClicked={setCheckClicked} />
      <LachFooter />
    </>
  );
};

export default App;
