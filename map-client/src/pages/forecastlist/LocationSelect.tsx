import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Location from './Location';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    }),
);

interface Props {
    locations: Location[],
    active: Location | null,
    onChange: (event: React.ChangeEvent<{ value: any }>) => void,
}

export default function LocationSelect(props: Props) {
    const classes = useStyles();

    let value = ""
    if (props.active)
        value = props.active.name

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
                labelId="location-select-label"
                id="location-select"
                value={value}
                onChange={props.onChange}
            >
                {
                    props.locations.map((loc) => {
                        const name = loc.name;
                        return <MenuItem key={name} value={name}>{name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    );
}
