import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrowSharp';
import linkedIn from '../img/linkedin-black.svg';

const useStyles = makeStyles({
  header: { backgroundColor: 'white', color: 'black' },
});

export const TopBar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const classes = useStyles();
  const open = Boolean(visible);

  // eslint-disable-next-line
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <Box>
      <AppBar position="static" className={classes.header}>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'Play, sans-serif',
          }}
        >
          <h3 style={{ marginLeft: '2%' }}>
            <a href="#">Lachieb.dev</a>
          </h3>
          <a href="https://www.linkedin.com/in/lachlan-bardwell">
            <img
              src={linkedIn}
              alt="linkedIn link"
              style={{ width: '40px', height: '30px' }}
            />
          </a>

          <div style={{ display: 'flex' }}>
            <h4 style={{ color: '##2b2b2b' }}>Other projects</h4>
            <IconButton
              id="anchor"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={visible ? 'true' : undefined}
              onClick={handleClick}
            >
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setVisible(false)}
                style={{ padding: 20 }}
              >
                <MenuItem>Shopping List</MenuItem>
                <MenuItem
                  onClick={() => window.open('https://xando.lachieb.dev')}
                >
                  Naughts and Crosses
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    window.open('https://infinite-depths-41827.herokuapp.com/')
                  }
                >
                  Kitchen Daydreams
                </MenuItem>
              </Menu>
              <DoubleArrowIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
