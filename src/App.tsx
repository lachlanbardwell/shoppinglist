import './App.css';
import { LachHeader } from './components/header';
import { AddToBasket } from './components/basket';
import React from 'react';

function App() {
  return (
    <div>
      <LachHeader></LachHeader>
      <AddToBasket />
    </div>
  );
}

export default App;
