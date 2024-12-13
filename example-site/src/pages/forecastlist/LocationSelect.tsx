import React from 'react';
import { useTheme, SelectChangeEvent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Location from './Location';

import { ReactNode } from 'react';

interface Props {
    locations: Location[],
    active: Location | null,
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

export default function LocationSelect(props: Props) {
    const theme = useTheme();
    let value = ""
    if (props.active)
        value = props.active.name

    return (
        <FormControl variant="standard" sx={{ margin: theme.spacing(1), minWidth: 120, }}>
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
