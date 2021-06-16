import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { paletteMap, pageSpacing } from './utils/metMuiThemes'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createTheme from './utils/createTheme';
import Header from './components/Header';
import Map from './pages/Map';
import ForecastList from './pages/ForecastList';
import backGroundWaves from "./images/waves.png";
import NotFound from './pages/NotFound';

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
      <Header />
      <BrowserRouter>
        <div className={classes.root}>
          <Switch>
            <Route exact={true} path='/' component={Map} />
            <Route exact={true} path='/map' component={Map} />
            <Route exact={true} path='/forecastlist' component={ForecastList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

