import React from 'react';
import { Box } from '@mui/material';
import ForecastMap from './map/ForecastMap'

const Map: React.FC = () => {
  return (
      <Box sx={{ zIndex: 2 }}>
          <ForecastMap />
      </Box>

  );
}

export default Map;