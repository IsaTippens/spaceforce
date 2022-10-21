import { Button, TextField, Box, Stack, Typography } from "@mui/material";
import LocationSelect from "../location_select";
import FlightTypeSelect from "../flight_type_select";
import FlightDatePicker from "../flight_date_picker";
import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
//import moment
import moment from 'moment';

function BookingTab(props) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flightType, setFlightType] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const navigate = useNavigate();
    const location = useLocation();

    const proceedClick = () => {
        if (origin == destination) {
            alert("Departure location and Destination cannot be the same!");
            return;
        }
        navigate("/booking", {
            state: {
                origin: origin,
                destination: destination,
                flightType: flightType,
                departureDate: departureDate,
                returnDate: returnDate,
            }
        });
    }

    useEffect(() => {
        if (location.state) {
            setOrigin(location.state.origin);
            setDestination(location.state.destination);
            setFlightType(location.state.flightType);
            setDepartureDate(location.state.departureDate);
            setReturnDate(location.state.returnDate);
            return;
        }
        //Set departure date to today yyyy-mm-dd
        setDepartureDate(moment(new Date()).format("YYYY-MM-DD"));
        //Set return date to today + 1 day yyyy-mm-dd
        setReturnDate(moment(new Date()).add(1, 'days').format("YYYY-MM-DD"));
    }, []);


    return (
        <Box>
            <Stack spacing={3}>
                <LocationSelect label="Departure" selected={origin} onChange={(event) => { setOrigin(event.target.value) }} />
                <LocationSelect label="Destination" selected={destination} onChange={(event) => { setDestination(event.target.value) }} />
                <FlightTypeSelect label="Flight Type" value={flightType} onChange={(event) => { setFlightType(event.target.value) }} />
                <Stack spacing={2}>
                    <Typography variant="h6" align="left">
                        Date
                    </Typography>

                    <Stack direction="row" justifyContent="space-between"
                        alignItems="center" spacing={2}>
                        <FlightDatePicker sx={{ width: "100%" }} label="Departure" onChange={(e) => {
                            setDepartureDate(e.target.value);
                        }}
                            value={departureDate}
                        />
                        {
                            flightType == "Round-Trip" ? (<FlightDatePicker label="Return" sx={{ width: "100%" }} 
                            onChange = {(e) => {
                                setReturnDate(e.target.value);
                            }}
                            value = {returnDate}
                            />) : null
                        }
                    </Stack>

                </Stack>
                <Button variant="contained" size="large" onClick={proceedClick}>
                    Proceed
                </Button>
            </Stack>

        </Box>
    );

}

export default BookingTab;