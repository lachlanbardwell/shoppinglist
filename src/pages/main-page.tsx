import React, { useState } from 'react';
import { LachHeader } from '../components/header';
import { AddToBasket } from '../components/basket';

export const MainPage: React.FC = () => {
  const [checkClicked, setCheckClicked] = useState<boolean>(false);

  return (
    <div className="main-page-container">
      <LachHeader clicked={checkClicked} setCheckClicked={setCheckClicked} />
      <AddToBasket clicked={checkClicked} setCheckClicked={setCheckClicked} />
    </div>
  );
};
