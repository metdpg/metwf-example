import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Menu from './Menu';

const Header: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingBottom: 2, zIndex:1500 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 2 }}>
            Example site
          </Typography>
          <Box sx={{flexGrow: 0}}>
            <Menu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default Header;
