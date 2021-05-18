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
            let lat = Math.round(position.lat * 1000) / 1000
            let lng = Math.round(position.lng * 1000) / 1000
            const url = `${ base_url }lat=${lat}&lon=${ lng }`

            const response = await fetch(url)
            return await response.json() as WeatherGeoJSON
        }
        fetchForecastData().then((body: WeatherGeoJSON) => {
            setForecast(body)
        })
    }, [position]);

    return forecast == null ?
        (
            <p>Waiting...</p>
        ):
        (
            <ForecastGraph forecast={forecast} />
        )
}