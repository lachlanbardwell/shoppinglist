import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  header: { backgroundColor: 'white', color: 'black' },
});

export const TopBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState();
  const classes = useStyles();
  const open = Boolean(visible);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <Box>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
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
            </Menu>
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            style={{
              padding: 10,
              margin: 'auto',
              justifyContent: 'centre',
            }}
          >
            <h4>
              <a href="#">Lachieb.dev</a>
            </h4>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
