import {useEffect, useState} from 'react';
import ForecastGraph from './Graph';
import {Weather, WeatherGeoJSON} from "./METWeatherJSON";

const base_url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete.json?'

type ForecastProps = {
    position: L.LatLng
}

export default function Forecast({position}: ForecastProps) {
    const [forecast, setForecast] = useState<Weather>(null)

    useEffect(() => {
        const fetchForecastData = async () => {
            const url = `${ base_url }lat=${position.lat}&lon=${ position.lng }`
            const response = await fetch(url)
            return await response.json() as WeatherGeoJSON
        }
        fetchForecastData().then((body: WeatherGeoJSON) => {
            setForecast(body)
        })
    });

    return forecast == null ?
        (
            <p>Waiting...</p>
        ):
        (
            <ForecastGraph forecast={forecast.properties} />
        )
}