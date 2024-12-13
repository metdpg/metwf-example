import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material';
import ParameterSpec, { displayName } from './ParameterSpec';

import { ReactNode } from 'react';

interface Props {
    availableParameters: ParameterSpec[]
    current: ParameterSpec[]
    onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void
}

function ParameterSelect(props: Props) {
    const theme = useTheme();

    return (
        <div>
            <FormControl variant="standard" sx={{ margin: theme.spacing(1), minWidth: 120, }}>
                <InputLabel id="parameter-select-label">Parameters</InputLabel>
                <Select
                    labelId="parameter-select-label"
                    id="parameter-select"
                    multiple
                    value={props.current.map((c) => c.name)}
                    onChange={props.onChange}
                >
                    {props.availableParameters.map((p) => {
                        return <MenuItem key={p.name} value={p.name}>{displayName(p)}</MenuItem>    
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default ParameterSelect