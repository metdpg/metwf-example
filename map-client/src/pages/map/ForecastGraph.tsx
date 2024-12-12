import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import type { EChartsOption } from "echarts";
import { useEffect, useState } from "react";
import React from 'react';
import getForecast, { Forecast } from '../../utils/forecast';

type ForecastGraphProps = {
    position: L.LatLng
}

type Params = {
    temp: number[]
    precip: number[]
    timesteps: string[]
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
        //let hours: string[] = hourlyTimeLabels(forecast)
        let params = sixHourlyParamValues(forecast)

        let title = "Forecast for lat: " + forecast.geometry.coordinates[1] + ", long: " + forecast.geometry.coordinates[0]

        return (
            <ReactECharts option={echartsData(title, params.timesteps, params)} />
        );
    } else {
        return (<p>
            Waiting...
        </p>
        )
    }
}

function echartsData(title: string, timesteps: string[], params: Params): EChartsOption {
    if (params.temp == null){
        return {}
    }

    const options: EChartsOption = {
        title: {
            text: title
        },
        tooltip: {
            trigger: "axis",
        }, 
        xAxis: {
            type: 'category',
            data: timesteps,
            axisTick: {
                show: true,
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                },
                name: "Temperature",
            },
            {
                type: 'value',
                name: 'Precipitation',
                min: 0,
                max: Math.round(Math.max(...params.precip)),
                axisLabel: {
                    formatter: '{value} mm/h'
                },
                splitLine: {
                    show: false,
                }
            },
        ],
        visualMap: [{
            type: 'piecewise',
            show: false,
            seriesIndex: 0,
            dimension: 1,
            pieces: [
                {
                    min: -99,
                    max: 0,
                    color: 'blue'
                },
                {
                    min: 0,
                    max: 99,
                    color: 'red'
                }
            ]
        }],
        series: [
          {
            data: params.temp,
            type: 'line',
            showSymbol: false,
            yAxisIndex: 0,
          },
          {
            data: params.precip,
            type: 'bar',
            color: 'lightblue',
            yAxisIndex: 1,
          }
        ]
      };

      return options
}

function sixHourlyParamValues(forecast: Forecast): Params {
    let temp_values: number[] = []
    let precip_values: number[] = []
    let timesteps: string[] = []

    let nextTime: Date = new Date(forecast.properties.timeseries[0].time)

    forecast.properties.timeseries.forEach((step, _) => {
        let stepTime = new Date(step.time)

        if (step.data.next_6_hours &&
            stepTime >= nextTime ) {

            let temp = step.data.instant?.details?.air_temperature
            let precip = step.data.next_6_hours?.details?.precipitation_amount
            if (temp !== undefined) {
                temp_values.push(temp)
            }
            if (precip !== undefined){
                precip_values.push(precip)
            }

            timesteps.push(timeLabel(stepTime))
            nextTime.setHours(stepTime.getHours() + 6)
        }
    })

    if (timesteps.length!== temp_values.length || timesteps.length !== precip_values.length) {
        throw new Error("missing values in forecast.")
    }

    return {
        temp: temp_values,
        precip: precip_values,
        timesteps: timesteps
    }
}



function hourlyParamValues(forecast: Forecast): Params {
    let temp_values: number[] = []
    let precip_values: number[] = []
    let timesteps: string[] = []

    forecast.properties.timeseries.forEach((step, _) => {
        if (step.data.next_1_hours) {
            let temp = step.data.instant?.details?.air_temperature
            let precip = step.data.next_1_hours?.details?.precipitation_amount
            if (temp !== undefined) {
                temp_values.push(temp)
            }
            if (precip !== undefined){
                precip_values.push(precip)
            }
            timesteps.push(timeLabel(new Date(step.time)))
        }
    })

    if (timesteps.length !== temp_values.length || timesteps.length !== precip_values.length) {
        throw new Error("missing values in forecast.") 
    }

    return {
        temp: temp_values,
        precip: precip_values,
        timesteps: timesteps
    }
}

function timeLabel(t: Date) {
    return `${t.getFullYear()}-${t.getMonth()}-${t.getUTCDate()} ${("0" + t.getHours()).slice(-2)}`
}
