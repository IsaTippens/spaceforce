import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useState } from "react";

function FlightTypeSelect(props) {
    const locations = [
        "One-Way",
        "Round-Trip",
    ]

    const [location, setLocation] = useState("One-Way");

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
                    value={location}
                    label={props.label}
                    onChange={(event) => {
                        setLocation(event.target.value);
                    }}
                >
                    {generateMenuItems()}
                </Select>
            </FormControl>
        </Box>
    );
}

export default FlightTypeSelect;