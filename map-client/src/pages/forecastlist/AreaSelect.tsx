import React from 'react'
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

import { ReactNode } from 'react';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         formControl: {
//             margin: theme.spacing(1),
//             minWidth: 120,
//         }
//     }),
// );


interface Props {
    areas: string[]
    current: string
    onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
    //event: React.ChangeEvent<{ value: any }>) => void,
}

function AreaSelect(props: Props) {
    const theme = useTheme();

    return (
        <FormControl sx={{ margin: theme.spacing(1), minWidth: 120, border:0 }}>
            <InputLabel id="location-select-label">Area</InputLabel>
            <Select
                sx={{ border:0 }}
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