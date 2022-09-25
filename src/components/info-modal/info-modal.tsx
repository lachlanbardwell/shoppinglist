import React from 'react';
import { Button } from '@material-ui/core';
import { IInfoModal } from '../../types';
import CloseIcon from '@material-ui/icons/Close';
import './info-modal.css';

export const InfoModal: React.FC<IInfoModal> = (props) => {
  return (
    <div className="info-modal" onClick={() => props.setInfoClicked(false)}>
      <section className="modal-outer" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
          <p>
            Shopping cart app created using Create React App. Attempts to fetch
            data from a self-written backend API. If unsuccessful re-attempts to
            fetch from a cloned mock API in the front end.
          </p>
          <p>
            The users selected items, their quantities and costs are stored in
            context and can be viewed in the cart page, along with an
            accompanying image fetched from the Flickr API.
          </p>
          <p>
            The project is hosted using an AWS lightsail instance with an Apache
            HTTP server. It is pipelined for continuous development through
            GitHub Actions.
          </p>
        </div>
        <Button
          className="close-modal"
          variant="contained"
          style={{
            position: 'absolute',
            top: '10%',
            right: '2%',
          }}
          onClick={() => {
            props.setInfoClicked(false);
          }}
        >
          Click anywhere to close
          <CloseIcon />
        </Button>
      </section>
    </div>
  );
};
