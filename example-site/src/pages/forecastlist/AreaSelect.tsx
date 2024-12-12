import React from 'react'
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

import { ReactNode } from 'react';


interface Props {
    areas: string[]
    current: string
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}

function AreaSelect(props: Props) {
    const theme = useTheme();

    return (
        <FormControl variant="standard" sx={{ margin: theme.spacing(1), minWidth: 120}}>
            <InputLabel id="area-select-label">Area</InputLabel>
            <Select
                labelId="area-select-label"
                id="area-select"
                value={props.current}
                onChange={props.onChange}
            >
                {
                    props.areas.map((a) => {
                        return <MenuItem key={a} value={a}>{a}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    );
}

export default AreaSelect