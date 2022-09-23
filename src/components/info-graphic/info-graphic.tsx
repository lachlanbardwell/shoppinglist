import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './info-graphic.css';
import { Button } from '@material-ui/core';

export const InfoGraphic: React.FC = () => {
  return (
    <div className="app-info">
      <Button className="info-button">
        <InfoIcon style={{ fontSize: '50px' }} />
      </Button>
    </div>
  );
};
