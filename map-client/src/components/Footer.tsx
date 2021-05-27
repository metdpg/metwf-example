import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { pageSpacing } from '../utils/metMuiThemes';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...pageSpacing(theme),
      color: theme.palette.primary.main,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      bottom: 0,
      backgroundColor: theme.palette.primary.contrastText,
      borderTop: '2px solid ' + theme.palette.primary.main
    },
    contact: {
      textAlign: 'center',
      whiteSpace: 'pre-line',
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        marginTop: theme.spacing(0),
      },
    },
    socialLinks: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
      color: theme.palette.primary.main,

      [theme.breakpoints.up('md')]: {
        textAlign: 'right',
        marginTop: theme.spacing(0),
      },
    }
  }),
);

const Footer: React.FC = () => {
  const styles = useStyles();

  return (
    <footer className={styles.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} className={styles.contact} >
          <Typography color={"inherit"}  >
            Meteorologisk institutt<br />
            Henrik Mohns Plass 1<br />
            0371 Oslo<br />
            Telefon 22 96 30 00<br />
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={styles.socialLinks}>
          <IconButton aria-label="MET på Facebook" href="https://www.facebook.com/Yr-22652235447/" target="_blank" color="primary" >
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="MET på Twitter" href="https://twitter.com/Meteorologene" target="_blank" color="primary" >
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="MET på Instagram" href="https://www.instagram.com/yrbilder/" target="_blank" color="primary" >
            <InstagramIcon />
          </IconButton>
        </Grid>
      </Grid>

    </footer >
  );
};

export default Footer;
