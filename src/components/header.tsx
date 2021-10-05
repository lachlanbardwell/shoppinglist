import React from 'react';
import { useState } from 'react';

export const LachHeader: React.FC = () => {
  const [name] = useState<string>('Lachie');

  return (
    <div>
      <header>
        <h2>{`${name}'s Shopping List`}</h2>
      </header>
    </div>
  );
};
