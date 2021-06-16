import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@material-ui/core'
import WeatherIcon from './WeatherIcon'
import Location from './Location'
import getForecast, { Forecast } from '../../utils/forecast';
import { definitions } from '../../utils/locationforecast';
import correct from '../../utils/forecast_correct';
import { CSSProperties } from '@material-ui/styles';
import ParameterSpec, { displayName } from './ParameterSpec';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            maxHeight: '49em',
        },
        forecastHeader: {
            textAlign: "center",
            fontWeight: "bolder",
            color: "#777777"
        },
        numericForecast: {
            textAlign: "center",
            color: theme.palette.primary.main,
        },
        numericForecastCorrected: {
            textAlign: "center",
            color: theme.palette.secondary.main,
        },
        timeIndicator: {
            fontWeight: "bold",
            color: "#777777"
        }
    }))

interface Props {
    location: Location | null
    parameters: ParameterSpec[]
}


export default function ForecastTable(props: Props) {
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


    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table stickyHeader>
                <ForecastTableHeader forecast={forecast} parameters={props.parameters} />
                <ForecastTableBody forecast={forecast} parameters={props.parameters} />
            </Table>
        </TableContainer >
    );
}

type ForecastDetails = definitions["forecast_details"]

interface HeaderProps {
    parameters: ParameterSpec[]
    forecast: Forecast
}

function ForecastTableHeader(props: HeaderProps) {
    const classes = useStyles()

    const st: CSSProperties = { textAlign: "left" }

    function detailsHeader(parameters: ParameterSpec[]) {
        let h = [
            <TableCell key='header_a' className={classes.forecastHeader} style={st} ></TableCell>,
            <TableCell key='header_b' className={classes.forecastHeader}></TableCell>
        ]
        for (const p of parameters) {
            h.push(<TableCell className={classes.forecastHeader} key={"details_header_model_" + p.name}>Model</TableCell>)
            h.push(<TableCell className={classes.forecastHeader} key={"details_header_corrected_" + p.name}>Corrected</TableCell>)
        }
        return h
    }

    return (
        <TableHead>
            <TableRow key='valuetype_header'>
                {detailsHeader(props.parameters)}
            </TableRow>
            <TableRow key='parameters_header'>
                <TableCell
                    key='details_header_time'
                    className={classes.forecastHeader}
                    style={st}>
                    Time
                </TableCell>
                <TableCell
                    key='details_header_symbol'
                    className={classes.forecastHeader} />

                {props.parameters.map((p) => {
                    let units = props.forecast.properties.meta.units[p.name]
                    if (!units) {
                        units = "?"
                    }
                    const headerTitle: string = `${displayName(p)} (${units})`
                    return <TableCell className={classes.forecastHeader} key={"head_" + p.name} colSpan={2}>{headerTitle}</TableCell>
                })}

            </TableRow>
        </TableHead>
    )
}

interface TableBodyProps {
    parameters: ParameterSpec[]
    forecast: Forecast
}

function ForecastTableBody(props: TableBodyProps) {
    const classes = useStyles()

    function forecastValues(time: string, timestep: definitions["forecast_timestep"], parameters: ParameterSpec[]) {
        let cells = [
            <TableCell
                className={classes.timeIndicator}
                key={"value_time_" + timestep.time}>
                {time}
            </TableCell>,
            <TableCell
                key={"value_icon_" + timestep.time}>
                <WeatherIcon width="32px" symbolCode={timestep?.data?.next_1_hours?.summary?.symbol_code} />
            </TableCell>
        ]
        for (const p of parameters) {
            const value = getParameterValue(timestep.data, p.name)
            cells.push(
                <TableCell
                    className={classes.numericForecast}
                    key={'value_' + p.name + "_" + timestep.time}>
                    {value}
                </TableCell>
            )

            let correctedValue = value
            if (value !== "-") {
                correctedValue = correct(p.name, props.forecast.properties.meta.units[p.name], value)
                correctedValue = Math.round(correctedValue * 10) / 10
            }
            cells.push(
                <TableCell
                    className={classes.numericForecastCorrected}
                    key={'corrected_' + p.name + "_" + timestep.time}>
                    {correctedValue}
                </TableCell>
            )
        }

        return cells
    }

    return (
        <TableBody>
            {props.forecast.properties.timeseries.map((timestep) => {
                var time = (new Date(Date.parse(timestep.time))).toLocaleString();
                return (
                    <TableRow key={timestep.time} >
                        {forecastValues(time, timestep, props.parameters)}
                    </TableRow>)
            })}
        </TableBody>
    )
}

function getParameterValue(timestepData: ForecastDetails | undefined, parameter: string): number | "-" {
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
