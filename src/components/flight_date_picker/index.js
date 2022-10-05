import * as React from 'react';
import TextField from '@mui/material/TextField';

function FlightDatePicker(props) {
    return (
        <TextField
        id="date"
        label={props.label}
        type="date"
        defaultValue="2022-10-04"
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
}

export default FlightDatePicker;