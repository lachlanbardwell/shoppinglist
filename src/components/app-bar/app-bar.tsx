import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/context';
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
    <Box
      style={{
        boxShadow: '0 3px 1px -2px gray',
        zIndex: 1,
        paddingRight: 'calc(100vw - 110%)',
        width: '100%',
      }}
    >
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
            <a href="https://lachieb.dev">
              <h3 style={{ color: '##2b2b2b' }}>LachieB.dev</h3>
            </a>
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
                <a
                  href="https://quackle.net"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>Quackle</MenuItem>
                </a>
                <a
                  href="https://shoppinglist.lachieb.dev"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>Shopping List</MenuItem>
                </a>
                <a
                  href="https://xando.lachieb.dev"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>Naughts and Crosses</MenuItem>
                </a>
                <a
                  href="https://kitchen.lachieb.dev"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>Kitchen Daydreams</MenuItem>
                </a>
              </Menu>
              <DoubleArrowIcon />
            </IconButton>
          </div>
          <Link to="/">
            <h3>Shopping List</h3>
          </Link>
          <div className="view-cart">
            <Link
              to="/cart"
              style={{
                color: 'black',
                display: 'flex',
                textDecoration: 'none',
              }}
            >
              <h3>View Cart</h3>&nbsp;
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
