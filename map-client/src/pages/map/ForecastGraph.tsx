import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import type { EChartsOption } from "echarts";
import { useEffect, useState } from "react";
import React from 'react';
import getForecast, { Forecast } from '../../utils/forecast';
import { maxHeaderSize } from 'http';

type ForecastGraphProps = {
    position: L.LatLng
}

type Params = {
    temp: (number | null)[]
    precip: (number | null)[]
}

type HourlyParams = {
    temp: number[]
    precip: number[]
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

        //let plotly_data = plotlyData(hours, params)
        let title = "Forecast for lat: " + forecast.geometry.coordinates[1] + ", long: " + forecast.geometry.coordinates[0]

        console.log(params.temp)
        return (
            <ReactECharts option={echartsData(title, hours, params)}
            ></ReactECharts>
        );
    } else {
        return (<p>
            Waiting...
        </p>
        )
    }
}

function echartsData(title: string, hours: string[], params: HourlyParams): EChartsOption {
    if (params.temp == null){
        return {}
    }

    const options: EChartsOption = {
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            data: hours,
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
        series: [
          {
            data: params.temp,
            type: 'line',
            showSymbol: false,
            color: 'red',
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



function hourlyParamValues(forecast: Forecast): HourlyParams {
    let temp_values: number[] = []
    let precip_values: number[] = []

    let hours = 0
    forecast.properties.timeseries.forEach((step, _) => {
        if (step.data.next_1_hours) {
            if (step.data.instant?.details) {
                hours = hours + 1
                let temp: number | undefined | null = step.data.instant?.details?.air_temperature
                let precip: number | undefined | null = step.data.next_1_hours?.details?.precipitation_amount

                if (temp !== undefined) {
                    temp_values.push(temp)
                }
                if (precip !== undefined){
                    precip_values.push(precip)
                }
            }
        }
    })

    if (hours != temp_values.length || hours != precip_values.length) {
        throw new Error("missing values in forecast.") 
    }

    return {
        temp: temp_values,
        precip: precip_values
    }
}

function hourlyTimeLabels(forecast: Forecast){

    let hours: string[] = []
    forecast.properties.timeseries.forEach((step, _) => {
        if(step.data.next_1_hours){
            let d = new Date(step.time)
            let timestamp = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}`
            hours.push(timestamp)
        }
    })
    return hours
}

function allTimeLabels(forecast: Forecast) {
    let start = forecast.properties.timeseries[0].time
    let end = forecast.properties.timeseries[forecast.properties.timeseries.length - 1].time

    let hours: string[] = []
    for (let d = new Date(start); d <= new Date(end); d.setHours(d.getHours() + 1)) {
        hours.push(d.toISOString())
    }

    return hours
}

function allParamValues(forecast: Forecast): Params {
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
