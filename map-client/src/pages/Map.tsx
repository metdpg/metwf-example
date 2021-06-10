import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { pageSpacing } from '../utils/metMuiThemes';
import ForecastMap from './map/ForecastMap'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...pageSpacing(theme),
      flexGrow: 1,
    },
  }),
);


const Map: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <ForecastMap />
    </div>
  );
}

export default Map;