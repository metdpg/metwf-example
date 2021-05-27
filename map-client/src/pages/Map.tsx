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
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paperImage: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    homePageImg: {
      maxWidth: '100%',
    },
    table: {
      margin: theme.spacing(2),
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