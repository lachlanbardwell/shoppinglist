import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Badge,
} from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrowSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './app-bar.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context';

const useStyles = makeStyles({
  header: { backgroundColor: 'white', color: 'black' },
});

export const TopBar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const classes = useStyles();
  const open = Boolean(visible);
  const { cartItems, calcTotal } = useContext(CartContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
            alignItems: 'center',
            fontFamily: 'Play, sans-serif',
          }}
        >
          <div style={{ display: 'flex', flexBasis: '0' }}>
            <h3 style={{ color: '##2b2b2b' }}>Lachieb.dev</h3>
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
          <Link to={'/'}>
            <h3>Shopping List</h3>
          </Link>
          <div className="view-cart">
            <Link
              to={'/cart'}
              style={{
                color: 'black',
                display: 'flex',
                textDecoration: 'none',
              }}
            >
              <h4>View Cart</h4>&nbsp;
              <div className="cart-icon">
                <Badge
                  badgeContent={calcTotal(cartItems)}
                  color="secondary"
                  overlap="rectangular"
                  showZero
                >
                  <ShoppingCartIcon
                    style={{ margin: 'auto' }}
                    fontSize="medium"
                  />
                </Badge>
              </div>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
