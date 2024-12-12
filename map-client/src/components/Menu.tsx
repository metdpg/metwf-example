import React from 'react';
import { useTheme } from '@mui/material';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function DemoMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const theme = useTheme();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{flex: 1, zIndex: 1500}}>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MenuIcon sx={{ color: theme.palette.primary.contrastText}} />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id="menu-list-grow" >
                  <MenuItem onClick={() => window.open("/", "_self")}>Map</MenuItem>
                  <MenuItem onClick={() => window.open("/forecastlist", "_self")}>Forecast List</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}