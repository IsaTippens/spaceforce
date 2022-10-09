import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
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
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.selected}
                    label={props.label}
                    onChange={props.onChange}
                >
                    {generateMenuItems()}
                </Select>
            </FormControl>
        </Box>
    );
}

export default LocationSelect;