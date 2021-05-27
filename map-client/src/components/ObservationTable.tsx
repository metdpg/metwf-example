import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { ObservationEntryList } from '../@Types/ObservationEntry';
import { ObservationEntry } from '../@Types/ObservationEntry.d';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            marginTop: theme.spacing(3),
        },
        tableHead: {
            fontWeight: 'bold',
        },
        tableTime: {
            fontStyle: 'italic',
        }
    }),
);

type Props = {
    locationName: string;
    observations: ObservationEntryList;
}


const ObservationTable: React.FC<Props> = ({ locationName, observations }) => {
    const styles = useStyles();
    return (
        <>
            <Typography variant="h5">Observasjoner for {locationName}</Typography>
            <TableContainer component={Paper} className={styles.table}>
                <Table aria-label="Observasjoner">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.tableHead}>Tid</TableCell>
                            <TableCell className={styles.tableHead} align="right">Vind</TableCell>
                            <TableCell className={styles.tableHead} align="right">Trykk</TableCell>
                            <TableCell className={styles.tableHead} align="right">Temperatur</TableCell>
                            <TableCell className={styles.tableHead} align="right">Skydekke</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {observations.map((row: ObservationEntry) => (
                            <TableRow key={row.time}>
                                <TableCell component="th" scope="row" className={styles.tableTime}>
                                    {row.time}
                                </TableCell>
                                <TableCell align="right">{row.wind.toFixed(0)} m/s</TableCell>
                                <TableCell align="right">{row.pressure.toFixed(0)} hPa</TableCell>
                                <TableCell align="right">{row.temperature.toFixed(1)} ℃</TableCell>
                                <TableCell align="right">{row.clouds.toFixed(0)} %</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="caption">Tabellen viser ikke ekte observasjoner</Typography>
        </>
    );
}

export default ObservationTable;
