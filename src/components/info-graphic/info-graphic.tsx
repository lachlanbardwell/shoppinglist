import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './info-graphic.css';
import { Button } from '@material-ui/core';
import { IHeaderCheck } from '../../types';

export const InfoGraphic: React.FC<IHeaderCheck> = (
  props: IHeaderCheck,
): JSX.Element => {
  return props.clicked ? (
    <div></div>
  ) : (
    <div className="app-info">
      <Button className="info-button">
        <InfoIcon style={{ fontSize: '50px' }} />
      </Button>
    </div>
  );
};
