import { FormControl, InputLabel, Select, MenuItem, Box, TextField } from "@mui/material";
import { useState } from "react";

function LocationSelect(props) {
    const locations = [
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Pluto"
    ]
    const generateMenuItems = () => {
        return locations.map((location) => {
            return (<MenuItem value={location}>{location}</MenuItem>);
        });
    }

    return (
        <Box sx={{
        }}>
                <TextField
                    {...props}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.selected}
                    label={props.label}
                    onChange={props.onChange}
                    select
                    fullWidth
                >
                    {generateMenuItems()}
                </TextField>
        </Box>
    );
}

export default LocationSelect;