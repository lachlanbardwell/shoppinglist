import React, { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './info-graphic.css';
import { IHeaderCheck } from '../../types';
import { InfoModal } from '../info-modal/info-modal';

export const InfoGraphic: React.FC<IHeaderCheck> = (
  props: IHeaderCheck,
): JSX.Element => {
  const [infoClicked, setInfoClicked] = useState<boolean>(false);

  return props.clicked ? (
    <div></div>
  ) : (
    <div className="app-info">
      <span className="info-button" onClick={() => setInfoClicked(true)}>
        <InfoIcon style={{ fontSize: '50px' }} />
        <div className="info-popout">
          <p>&nbsp; More information about this App&nbsp;</p>{' '}
        </div>
      </span>
      {infoClicked && <InfoModal setInfoClicked={setInfoClicked} />}
    </div>
  );
};
