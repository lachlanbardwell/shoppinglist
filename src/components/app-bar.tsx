import React from 'react';
import { AppBar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
// import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  header: { backgroundColor: 'white' },
});

export const TopBar: React.FC = () => {
  const classes = useStyles();
  return (
    <Box>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
