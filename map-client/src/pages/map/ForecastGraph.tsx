import Plot from 'react-plotly.js';
import { useEffect, useState } from "react";
import React from 'react';
import getForecast, { Forecast } from '../../utils/forecast';

type ForecastGraphProps = {
    position: L.LatLng
}

type Params = {
    temp: (number | null)[]
    precip: (number | null)[]
}

type PlotlyData = {
    temp: Plotly.Data
    precip: Plotly.Data
}

export default function ForecastGraph({ position }: ForecastGraphProps) {
    const [forecast, setForecast] = useState<Forecast | null>(null)

    useEffect(() => {
        setForecast(null)
        getForecast({ lat: position.lat, lon: position.lng }).then(
            (forecast: Forecast | null) => {
                setForecast(forecast)
            }
        )
    }, [position]);

    if (forecast) {
        let hours: string[] = hourlyTimeLabels(forecast)
        let params = hourlyParamValues(forecast)

        let plotly_data = plotlyData(hours, params)


        return (
            <Plot
                data={[plotly_data.temp, plotly_data.precip]}

                layout={{
                    width: 740,
                    height: 400,
                    title: "Forecast for lat: " + forecast.geometry.coordinates[1] + ", long: " + forecast.geometry.coordinates[0],
                    xaxis: {
                        title: 'Time',
                        showgrid: true,
                        zeroline: false
                    },
                    yaxis: {
                        title: 'Celsius',
                        zeroline: false,
                        showgrid: false,
                        showline: true
                    },
                    yaxis2: {
                        title: "Precipitation (mm/h)",
                        zeroline: false,
                        showline: false,
                        showgrid: false,
                        side: "right",
                        overlaying: "y"

                    },
                    legend: {
                        orientation: "v",
                        yanchor: "bottom",
                        xanchor: "left"
                    },
                    margin: {
                        pad: 10
                    }

                }}

                config={{ displayModeBar: false }}
            />

        )
    } else {
        return (<p>
            Waiting...
        </p>
        )
    }

}

function plotlyData(hours: string[], params: Params): PlotlyData {
    const temperature: Plotly.Data =
    {
        x: hours,
        y: params.temp,
        type: "scatter",
        name: "Temperature",
        mode: "lines",
        yaxis: "y",
        visible: true,
        connectgaps: true,
        marker: {
            color: 'rgb(220,20,60)',
            size: 12
        },
    }

    const precipitation: Plotly.Data =
    {
        x: hours,
        y: params.precip,
        type: "bar",
        name: "Precipitation",
        yaxis: "y2",
        opacity: 0.3,
        visible: true,
        marker: {
            color: 'rgb(30,144,255)',
        },
    }

    return {
        temp: temperature,
        precip: precipitation
    }
}


function hourlyParamValues(forecast: Forecast): Params {
    let temp_values: (number | null)[] = []
    let precip_values: (number | null)[] = []

    forecast.properties.timeseries.forEach((step, index) => {
        if (step.data.next_1_hours) {
            let precip: number | undefined | null = step.data.next_1_hours?.details?.precipitation_amount
            if (precip === undefined)
                precip = null
            precip_values.push(precip)

            let temp: number | undefined | null = step.data.instant?.details?.air_temperature
            if (temp === undefined)
                temp = null
            temp_values.push(temp)

        } else if (step.data["next_6_hours"]) {
            let precip: number | undefined | null = step.data.next_6_hours?.details?.precipitation_amount
            if (precip === undefined)
                precip = null
            else
                precip /= 6
            for (let i = 0; i < 6; i++) {
                precip_values.push(precip)
            }

            let temp: number | undefined | null = step.data.instant?.details?.air_temperature
            if (temp === undefined)
                temp = null
            for (let i = 0; i < 5; i++)
                temp_values.push(null)
            temp_values.push(temp)

        }
    })

    return {
        temp: temp_values,
        precip: precip_values
    }
}

function hourlyTimeLabels(forecast: Forecast) {
    let start = forecast.properties.timeseries[0].time
    let end = forecast.properties.timeseries[forecast.properties.timeseries.length - 1].time

    let hours: string[] = []
    for (let d = new Date(start); d <= new Date(end); d.setHours(d.getHours() + 1)) {
        hours.push(d.toISOString())
    }

    return hours
}