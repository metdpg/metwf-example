import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { pageSpacing } from '../utils/metMuiThemes';
import { FeatureCollection, Point } from 'geojson';
import Location from './forecastlist/Location';
import ForecastTable from './forecastlist/ForecastTable';
import LocationSelect from './forecastlist/LocationSelect';
import AreaSelect from './forecastlist/AreaSelect';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            ...pageSpacing(theme),
            flexGrow: 1,
        },
    }),
);


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



const areas = ["Ethiopia", "Malawi"]

export default function ForecastList() {
    const styles = useStyles();

    const [area, setArea] = React.useState<string>(areas[0])
    const [location, setLocation] = React.useState<Location | null>(null);
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
        console.log(event.target.value)
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

    return (
            <Grid className={styles.root} container direction="column">
                <Grid container item spacing={2}>
                    <AreaSelect areas={areas} current={area} onChange={handleAreaUpdate} />
                    <LocationSelect locations={allLocations} active={location} onChange={handleLocationUpdate} />
                </Grid>
                <Grid item>
                    <ForecastTable location={location}></ForecastTable>
                </Grid>
            </Grid>
    )
}
