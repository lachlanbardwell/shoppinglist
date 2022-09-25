import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './info-graphic.css';
import { IHeaderCheck } from '../../types';

export const InfoGraphic: React.FC<IHeaderCheck> = (
  props: IHeaderCheck,
): JSX.Element => {
  return props.clicked ? (
    <div></div>
  ) : (
    <div className="app-info">
      <span className="info-button">
        <InfoIcon style={{ fontSize: '50px' }} />
        <div className="info-popout">
          <p>&nbsp; More information about this App&nbsp;</p>{' '}
        </div>
      </span>
    </div>
  );
};
