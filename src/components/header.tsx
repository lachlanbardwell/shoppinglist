import React from 'react';
import { useState } from 'react';

export const LachHeader: React.FC = () => {
  const [name] = useState<string>('');

  return (
    <div className="titleHeader">
      <h2 className="lachieTitle">
        {name ? `${name}'s Shopping List` : 'Your custom Shopping List'}
      </h2>
      <span className="lachieSpan">Select a store below</span>
    </div>
  );
};
