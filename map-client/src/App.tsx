import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { paletteMap, pageSpacing } from './utils/metMuiThemes'
import { BrowserRouter, Route } from 'react-router-dom';
import createTheme from './utils/createTheme';
import Header from './components/Header';
import Map from './pages/Map';
import ForecastList from './pages/ForecastList';
import backGroundWaves from "./images/waves.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '.global-root': {
        width: '100%',
        maxWidth: '1440px',
        margin: '0px auto',
      },
    },
    root: {
      ...pageSpacing(theme),
      height: '100%',
      backgroundImage: `url(${backGroundWaves})`,
      flexGrow: 1,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={createTheme(paletteMap.get('teal_palette'), paletteMap.get('black_palette'))}>
      <BrowserRouter>
        <div className={classes.root}>
          <Route exact={true} path='/' render={() => (
            <>
              <Header />
              <Map />
            </>
          )} />
          <Route exact={true} path='/forecastlist' render={() => (
            <>
              <Header />
              <ForecastList />
            </>
          )} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

