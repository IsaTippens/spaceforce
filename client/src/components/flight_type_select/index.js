import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useState } from "react";

function FlightTypeSelect(props) {
    const flightTypes = [
        "One-Way",
        "Round-Trip",
    ]

    const generateMenuItems = () => {
        return flightTypes.map((location) => {
            return (<MenuItem value={location}>{location}</MenuItem>);
        });
    }
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                <Select
                    {...props}
                    defaultValue={"One-Way"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    <MenuItem value={"One-Way"}>{"One-Way"}</MenuItem>
                    <MenuItem value={"Round-Trip"}>{"Round-Trip"}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default FlightTypeSelect;