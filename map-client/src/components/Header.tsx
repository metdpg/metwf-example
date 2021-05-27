import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import logo from '../images/met_logo.png';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from './Menu';
import { pageSpacing } from '../utils/metMuiThemes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(1),
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
    toolBar: pageSpacing(theme),
    grow: {
      flexGrow: 1,
    },
    logo: {
      padding: theme.spacing(0),
      width: 150,
      [theme.breakpoints.up('sm')]: {
        width: 200,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    searchIcon: {
      color: theme.palette.primary.contrastText,
    }
  }),
);

const Header: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position={"static"} >
        <Toolbar className={styles.toolBar}>
          <img className={styles.logo} src={logo} alt="met logo" />
          <div className={styles.grow} />
          <IconButton className={styles.searchIcon} aria-label="Open drawer">
            <SearchIcon />
          </IconButton>
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
