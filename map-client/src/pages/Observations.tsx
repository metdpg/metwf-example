import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import ObservationTable from '../components/ObservationTable';
import { pageSpacing } from '../utils/metMuiThemes';
import { createRandomObs } from '../utils/randomObs';

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

const Observations: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} >
          <Paper className={styles.paper}>
            <ObservationTable locationName="Bergen" observations={createRandomObs(23)} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={styles.paper}>
            <ObservationTable locationName="Tromsø" observations={createRandomObs(23)} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Observations;
