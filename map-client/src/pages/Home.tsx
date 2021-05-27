import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import examplePng from '../images/example.png';
import { pageSpacing } from '../utils/metMuiThemes';
import { getNonesenseText } from '../utils/randomText';
import { paletteMap } from '../utils/metMuiThemes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...pageSpacing(theme),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paperLight: {
      padding: theme.spacing(2),
      background: theme.palette.primary.light,
    },
    paperDark: {
      padding: theme.spacing(2),
      background: theme.palette.primary.dark,
    },
    paperImage: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    homePageImg: {
      maxWidth: '100%',
    },
    formControl: {
      //sss
    }
  }),
);

type Props = {
  currentPalette: string;
  onPaletteChanged: (palette: string) => void;
}

const Home: React.FC<Props> = ({ currentPalette, onPaletteChanged }) => {
  const classes = useStyles();

  const paletteItems = Array.from(paletteMap.keys()).map((key) => {
    return (<MenuItem value={key}>{'Met ' + key.split('_')[0] + ' profil'}</MenuItem>);
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-label">Visuell profil</InputLabel>
            <Select
              labelId="select-label"
              value={currentPalette}
              onChange={(event) => onPaletteChanged(event.target.value as string)}
            >
              {paletteItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paperImage}>
            <img alt={"homepage"} className={classes.homePageImg} src={examplePng}></img>
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(1)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(3)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(4)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(5)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paperLight}>
            Light palette color
          </Paper>
          <Paper className={classes.paperDark}>
            Dark palette color
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
};

export default Home;

