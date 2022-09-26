import React from 'react';
import { IHeaderCheck } from '../types';
// import './header.css';

export const LachHeader: React.FC<IHeaderCheck> = (props) => {
  return (
    <div
      className="title-header"
      style={{ display: 'flex', minHeight: props.clicked ? '8vh' : '18vh' }}
    >
      <h2
        style={{
          margin: props.clicked ? 'none' : 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Play, sans-serif',
        }}
      >
        {props.clicked ? 'Choose list items' : 'Select a store to begin'}
      </h2>
    </div>
  );
};
