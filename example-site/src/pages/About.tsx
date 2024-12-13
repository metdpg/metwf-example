import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Map: React.FC = () => {
  return (
      <Box sx={{ padding:4 }}>
        <Typography sx={{paddingBottom:2 }}variant="h5">
          About
        </Typography>
        <Typography>
          Example web site showcasing how to use a weather timeseries web service to present weather data.
        </Typography>
        <br />
        <Typography>
          Weather icons are licensed by <Link href='https://yr.no/NRK'>yr.no/NRK</Link>.
        </Typography>
        <Typography>
          Weather forecast data are coming from <Link href="https://api.met.no/weatherapi/locationforecast/2.0/documentation">api.met.no</Link>.
        </Typography>
      </Box>
  );
}

export default Map;