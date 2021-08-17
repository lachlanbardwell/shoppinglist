import React from 'react';
import { useState } from 'react';

export const LachHeader: React.FC = () => {
  const [name, setName] = useState<string>('Lachie');

  return (
    <div className="App">
      <header className="App-header">{`${name}'s Shopping List`}</header>
    </div>
  );
};
