import Plot from 'react-plotly.js';
import {WeatherGeoJSON, Weather, Forecast} from './METWeatherJSON';
import {useEffect, useState} from "react";
import React from 'react';

const base_url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete.json?'

type ForecastGraphProps = {
    position: L.LatLng
}

type Params = {
    temp: (number|null)[]
    precip: number[]
}

type PlotlyData = {
    temp: Plotly.Data
    precip: Plotly.Data
}

export default function ForecastGraph({position}: ForecastGraphProps) {
    const [forecast, setForecast] = useState<Weather>(null)

    useEffect(() => {
        const fetchForecastData = async () => {
            let lat = Math.round(position.lat * 1000) / 1000
            let lng = Math.round(position.lng * 1000) / 1000
            const url = `${ base_url }lat=${lat}&lon=${ lng }`

            const response = await fetch(url)
            return await response.json() as WeatherGeoJSON
        }

        setForecast(null)
        fetchForecastData().then((body: WeatherGeoJSON) => {
            setForecast(body)
        })
    }, [position]);

    if (forecast){
        let hours: string[] = hourlyTimeLabels(forecast.properties)
        let params = hourlyParamValues(forecast.properties)

        let plotly_data = plotlyData(hours, params)
        
        
        return (
            <Plot
                data = {[plotly_data.temp, plotly_data.precip]}
        
                layout = {{
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

                config={{displayModeBar: false}}
            />
            
        )
    }else{
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

function hourlyParamValues(forecast: Forecast): Params{
    let temp_values:  (number|null)[] = []
    let precip_values: number[] = []
 
    forecast.timeseries.forEach((step, index) => {        
        if (step.data["next_1_hours"]){
            precip_values.push(step.data["next_1_hours"].details["precipitation_amount"])
            temp_values.push(step.data["instant"].details["air_temperature"])

        }else if (step.data["next_6_hours"]){
            const precip_6hours = step.data["next_6_hours"].details["precipitation_amount"]
            for (let i = 0; i < 6; i++){
                precip_values.push(precip_6hours/6)
            }
            for (let i = 0; i < 5; i++){
                temp_values.push(null)
            }

            temp_values.push(step.data["instant"].details["air_temperature"])
        }
    })

    return {
        temp: temp_values,
        precip: precip_values
    }
}

function hourlyTimeLabels(forecast: Forecast) {
    let start = forecast.timeseries[0].time
    let end = forecast.timeseries[forecast.timeseries.length - 1].time

    let hours: string[] = []
    for (let d = new Date(start); d <=  new Date(end); d.setHours(d.getHours() + 1) ){
        hours.push(d.toISOString())
    }

    return hours
}