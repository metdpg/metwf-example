import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { FeatureCollection, Point } from 'geojson';
import Location from './forecastlist/Location';
import ForecastTable from './forecastlist/ForecastTable';
import LocationSelect from './forecastlist/LocationSelect';
import AreaSelect from './forecastlist/AreaSelect';
import ParameterSpec from './forecastlist/ParameterSpec';
import ParameterSelect from './forecastlist/ParameterSelect';


async function getLocations(url: string): Promise<Location[]> {
    let loc: Location[] = []

    try {
        const citiesDocument = await fetch(url)

        const citiesJson: FeatureCollection = await citiesDocument.json() as FeatureCollection
        for (const feature of citiesJson.features) {
            const point = feature.geometry as Point;
            let name = feature.properties?.name
            if (name === undefined)
                name = "<no name>"

            loc.push({
                name: name,
                lon: point.coordinates[0],
                lat: point.coordinates[1]
            })
        }

    } catch (e) {
        console.log('unable to find cities document')
        return Promise.reject(e)
    }

    return Promise.resolve(loc);
}


const allParameters: ParameterSpec[] = [
    {
        name: "air_temperature",
    },
    {
        name: "precipitation_amount",
        displayName: "precipitation"
    },
    {
        name: "wind_from_direction"
    },
    {
        name: "wind_speed"
    },
    {
        name: "cloud_area_fraction",
        displayName: "cloudiness"
    }
]


const areas = ["Ethiopia", "Malawi"]

export default function ForecastList() {
    const [area, setArea] = React.useState<string>(areas[0])
    const [location, setLocation] = React.useState<Location | null>(null);
    const [parameters, setParameters] = React.useState<ParameterSpec[]>([allParameters[0], allParameters[1]]);
    const [allLocations, setAllLocations] = React.useState<Location[]>([]);

    useEffect(() => {
        const citiesUrl = `/${area.toLocaleLowerCase()}_cities.json`
        getLocations(citiesUrl)
            .then((loc) => {
                setLocation(null)
                setAllLocations(loc)
            })
    }, [area])
    useEffect(() => setLocation(allLocations[0]), [allLocations])

    const handleAreaUpdate = (event: React.ChangeEvent<{ value: string }>) => {
        setArea(event.target.value)
    }

    const handleLocationUpdate = (event: React.ChangeEvent<{ value: any }>) => {
        const name = event.target.value as string
        for (const loc of allLocations) {
            if (loc.name === name) {
                setLocation(loc);
                return
            }
        }
    }

    const handleParameterUpdate = (event: React.ChangeEvent<{ value: string[] }>) => {
        const selectedParameters: ParameterSpec[] = []
        for (const parameter of allParameters) {
            for (const selectedName of event.target.value) {
                if (parameter.name === selectedName) {
                    selectedParameters.push(parameter)
                }
            }
        }
        setParameters(selectedParameters)
    }


    return (
        <Grid container direction="column">
            <Grid container item spacing={2}>
                <AreaSelect areas={areas} current={area} onChange={handleAreaUpdate} />
                <LocationSelect locations={allLocations} active={location} onChange={handleLocationUpdate} />
                <ParameterSelect availableParameters={allParameters} current={parameters} onChange={handleParameterUpdate} />
            </Grid>
            <Grid item>
                <ForecastTable location={location} parameters={parameters}></ForecastTable>
            </Grid>
        </Grid>
    )
}
