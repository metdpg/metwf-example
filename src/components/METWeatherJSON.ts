import { JsonDecoder } from 'ts.data.json';

export type Weather = WeatherGeoJSON | null;
export type WeatherGeoJSON = {
    type: string;
    geometry: Geometry;
    properties: Forecast;
}

export type Geometry = {
    type: string;
    coordinates: number[];
}

export type Forecast = {
    meta: Meta;
    timeseries: TimeStep[];
}

export type Meta = {
    units: Units;
}

export type Units = {
    [key: string]: string;
}

export type TimeStep = {
    time: string;
    data: TimeStepData;
}

export type TimeStepData = {
    [key: string]: Period;
}

export type Period = {
    summary: Summary;
    details: Details;
}

export type Summary = {
    symbol_code: string;
    symbol_confidence: string;
}

export type Details = {
    [key: string]: number;
}

// const GeoJSONDecoder = JsonDecoder.object<GeoJSON>(
//     {
        
//     },
//     "GeoJSONDecoder"
// );
