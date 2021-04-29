import Plot from 'react-plotly.js';
import {Forecast} from './METWeatherJSON';

type ForecastGraphProps = {
    forecast: Forecast;
}

export default function ForecastGraph({forecast}: ForecastGraphProps) {
    let hours: string[] = timeLabelsInHours(forecast)
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

    const temperature: Plotly.Data =
        {
            x: hours,
            y: temp_values,
            type: "scatter",
            name: "Temperature",
            mode: "lines",
            yaxis: "y",
            visible: true,
            connectgaps: true
        }

    const precipitation: Plotly.Data =
        {
            x: hours,
            y: precip_values,
            type: "bar",
            name: "Precipitation",
            yaxis: "y2",
            opacity: 0.3,
            visible: true
        }

    return (
        <Plot
            data = {[temperature, precipitation]}

            layout = {{
                width: 740,
                height: 400,
                title: "Forecast",
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
                    showgrid: false,
                    side: "right",
                    overlaying: "y"

                }
            }}
        />

    )
}

function timeLabelsInHours(forecast: Forecast) {
    let start = forecast.timeseries[0].time
    let end = forecast.timeseries[forecast.timeseries.length - 1].time

    let hours: string[] = []
    for (let d = new Date(start); d <=  new Date(end); d.setHours(d.getHours() + 1) ){
        hours.push(d.toISOString())
    }

    return hours
}