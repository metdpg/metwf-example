import React, { useEffect, useState } from 'react';
import { capitalize, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import WeatherIcon from './WeatherIcon'
import Location from './Location'
import getForecast, { Forecast } from '../../utils/forecast';
import { definitions } from '../../utils/locationforecast';
import { CSSProperties } from '@material-ui/styles';

const useStyles = makeStyles({
    forecastHeader: {
        textAlign: "center",
        fontWeight: "bolder",
        color: "#777777"
    },
    numericForecast: {
        textAlign: "center",
        color: "#7d2cc9",
        // fontWeight: "bold"
    },
    timeIndicator: {
        fontWeight: "bold",
        color: "#777777"
    }
})



export default function ForecastTable(props: { location: Location | null }) {
    const classes = useStyles()

    const [forecast, setForecast] = useState<Forecast | null>(null)

    useEffect(() => {
        setForecast(null)
        getForecast(props.location).then(
            (f: Forecast | null) => {
                setForecast(f)
            }
        )
    }, [props.location]);

    if (props.location === null) {
        return <Typography>Waiting for locations...</Typography>
    }
    if (forecast === null) {
        return <Typography>Waiting...</Typography>
    }


    const parameters = [
        {
            name: "air_temperature",
        },
        {
            name: "precipitation_amount",
            displayName: "precipitation"
        },
        {
            name: "wind_from_direction"
        },
        {
            name: "wind_speed"
        }
    ]

    const st: CSSProperties = {textAlign: "left"}

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.forecastHeader} style={st} >Time</TableCell>
                        <TableCell className={classes.forecastHeader}></TableCell>

                        {parameters.map((p) => {
                            let units = forecast.properties.meta.units[p.name]
                            if (!units) {
                                units = "?"
                            }
                            const headerTitle: string = capitalize(`${p.displayName || p.name} (${units})`).replaceAll('_', ' ')
                            return <TableCell className={classes.forecastHeader} key={"head_" + p.name}>{headerTitle}</TableCell>
                        })}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {forecast.properties.timeseries.map((timestep) => {
                        var time = (new Date(Date.parse(timestep.time))).toLocaleString();
                        return (
                            <TableRow key={timestep.time} >
                                <TableCell className={classes.timeIndicator} key={"t_" + timestep.time}>{time}</TableCell>
                                <TableCell key={"icon_" + timestep.time}>
                                    <WeatherIcon width="32px" symbolCode={timestep?.data?.next_1_hours?.summary?.symbol_code} />
                                </TableCell>
                                {parameters.map((p) => {
                                    const value = getParameterValue(timestep.data, p.name)
                                    return <TableCell className={classes.numericForecast} key={p.name + "_" + timestep.time}>{value}</TableCell>;
                                })}
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

type ForecastDetails = definitions["forecast_details"]



function getParameterValue(timestepData: ForecastDetails | undefined, parameter: string): number | string {
    if (timestepData === undefined) {
        return "-"
    }

    let details = timestepData.instant?.details
    if (details !== undefined)
        if (details[parameter] !== undefined)
            return details[parameter];

    details = timestepData.next_1_hours?.details;
    if (details !== undefined)
        if (details[parameter] !== undefined)
            return details[parameter];

    // details = timestepData.next_6_hours?.details;
    // if (details !== undefined)
    //     if (details[parameter] !== undefined)
    //         return details[parameter];

    return "-"
}
