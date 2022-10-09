import * as React from 'react';
import TextField from '@mui/material/TextField';

function FlightDatePicker(props) {
    return (
        <TextField
        {...props}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
}

export default FlightDatePicker;