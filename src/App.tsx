import React from 'react';
import './App.css';
import { LachHeader } from './components/header';
import { AddToBasket } from './components/basket';

function App() {
  return (
    <div>
      <LachHeader />
      <AddToBasket />
    </div>
  );
}

export default App;
