import { operations, definitions } from "./locationforecast";


export type Query = operations["complete"]["parameters"]["query"];
export type Forecast = definitions["forecast"]


const base_url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete.json?'


export default async function getForecast(q: Query|null): Promise<Forecast|null> {
    if (!q)
        return null
    const lat = Math.round(q.lat * 1000) / 1000
    const lon = Math.round(q.lon * 1000) / 1000
    let url = `${ base_url }lat=${lat}&lon=${ lon }`
    if (q.altitude !== undefined)
        url += `&altitude=${q.altitude}`

    // console.log(url)
    const response = await fetch(url)
    return await response.json() as Forecast
}
