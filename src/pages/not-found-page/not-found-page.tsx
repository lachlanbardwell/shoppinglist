import React from 'react';
import BuildIcon from '@material-ui/icons/Build';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './not-found-page.css';

export const NotFoundPage: React.FC = () => {
  return (
    <section
      className="not-found-page-container"
      style={{ fontFamily: 'Play, sans-serif' }}
    >
      <Link to={'/'}>
        <Button className="reselectBtn" variant="contained">
          <ArrowBackIcon /> &nbsp; Return to shopping
        </Button>
      </Link>
      <span className="not-found-head">
        <h1>That page doesn&apos;t exist</h1>
        <BuildIcon style={{ fontSize: 50 }} />
        <h3>Check the URL and try again</h3>
      </span>
    </section>
  );
};
