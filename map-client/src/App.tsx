import React, { useState } from 'react';
import { MuiThemeProvider, SimplePaletteColorOptions } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { paletteMap } from './utils/metMuiThemes'
import { BrowserRouter, Route } from 'react-router-dom';
import createTheme from './utils/createTheme';
import Header from './components/Header';
import Map from './pages/Map'
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
      height: '100%',
      backgroundImage: `url(${backGroundWaves})`,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [palette, setPalette] = useState<SimplePaletteColorOptions | undefined>(paletteMap.get('teal_palette'));

  const handlePaletteChanged = (newPalette: string) => {
    setPalette(paletteMap.get(newPalette));
  }

  return (
    <MuiThemeProvider theme={createTheme(palette, paletteMap.get('black_palette'))}>
      <BrowserRouter>
        <div className={classes.root}>
          <Route exact={true} path='/' render={() => (
            <>
              <Header />
              <Map />
            </>
          )} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

