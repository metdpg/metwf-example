import React from 'react';
import { ThemeProvider, Box } from '@mui/material';
import { paletteMap } from './utils/metMuiThemes'
import { BrowserRouter, Route, Routes } from 'react-router';
import createProjectTheme from './utils/createTheme';
import Header from './components/Header';
import Map from './pages/Map';
import ForecastList from './pages/ForecastList';
import About from './pages/About';
import NotFound from './pages/NotFound';

// import backGroundWaves from "./images/waves.png";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={createProjectTheme(paletteMap.get('teal_palette'), paletteMap.get('black_palette'))}>
      <Header />
      <BrowserRouter>
          <Box sx={{flex: 1}}>
            <Routes>
              <Route path='/' element={<Map />} />
              <Route path='/map' element={<Map />} />
              <Route path='/forecastlist' element={<ForecastList />} />
              <Route path='/about' element={<About />} />
              <Route element={<NotFound />} />
            </Routes>
          </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

