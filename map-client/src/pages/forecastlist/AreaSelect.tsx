import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    }),
);


interface Props {
    areas: string[]
    current: string
    onChange: (event: React.ChangeEvent<{ value: any }>) => void,
}

function AreaSelect(props: Props) {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="location-select-label">Area</InputLabel>
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