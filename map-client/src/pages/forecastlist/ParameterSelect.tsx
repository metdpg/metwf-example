import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ParameterSpec, { displayName } from './ParameterSpec';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    }),
);

interface Props {
    availableParameters: ParameterSpec[]
    current: ParameterSpec[]
    onChange: (event: React.ChangeEvent<{ value: any }>) => void
}

function ParameterSelect(props: Props) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
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