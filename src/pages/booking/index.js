import { Button, TextField, Box, Stack, Typography, Paper, Grid, Container } from "@mui/material";
import LocationSelect from "../../components/location_select";
import FlightTypeSelect from "../../components/flight_type_select";
import FlightDatePicker from "../../components/flight_date_picker";
import FlightClassSelect from "../../components/flight_class_select";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Booking(props) {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [flightType, setFlightType] = useState(null);
    const [flightClass, setFlightClass] = useState("Economy");
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setOrigin(location.state.origin);
            setDestination(location.state.destination);
            setFlightType(location.state.flightType);
            setDepartureDate(location.state.departureDate);
            setReturnDate(location.state.returnDate);
        }
    }, []);

    let prices = {
        "Economy": {
            "Adult": 100,
            "Child": 50
        },
        "Business": {
            "Adult": 200,
            "Child": 100
        },
        "VIP": {
            "Adult": 300,
            "Child": 150
        }
    }

    const printReceipt = () => {
        let adultPrice = prices[flightClass]["Adult"];
        let childPrice = prices[flightClass]["Child"];
        let trip = `Travelling from ${origin} to ${destination}`;
        let tripType = `${flightType} ${flightClass} flight`;
        let tripDate = `Departing on ${departureDate}`;
        let tripReturn = `and returning on ${returnDate}`;
        let expectedTravelTime = `Expected travel time: +-30 minutes (travelling at light speed)`;
        let adults = `R${adultPrice} x ${numAdults} Adult(s): R${adultPrice * numAdults}`;
        let children = `R${childPrice} x ${numChildren} Child(ren): R${childPrice * numChildren}`;
        let total = (adultPrice * numAdults) + (childPrice * numChildren);
        return (
            <Stack>
                <Typography variant="h6" align="left">
                    {trip}
                </Typography>
                <Typography variant="body1" align="left">
                    {tripType}
                </Typography>
                <Typography variant="body1" align="left">
                    {tripDate} {flightType === "Round-Trip" ? tripReturn : ""}
                </Typography>
                <Typography variant="body1" align="left">
                    {expectedTravelTime}
                </Typography>
                <Typography variant="h5" align="left">
                    Receipt
                </Typography>
                <Typography variant="body1" align="left">
                    {adults}
                </Typography>
                <Typography variant="body1" align="left">
                    {children}
                </Typography>
                <Typography variant="body1" align="left">
                    Total: R{total}
                </Typography>
            </Stack>
        )
    }

    const proceedClick = () => {
        navigate("/payment", {
            replace: false,
            state: {
                total: getTotal
            }
        })
    }

    const getTotal = () => {
        let adultPrice = prices[flightClass]["Adult"];
        let childPrice = prices[flightClass]["Child"];
        let total = (adultPrice * numAdults) + (childPrice * numChildren);
        return total;
    }

    return (
        <Paper>
            <Stack component="form" noValidate spacing={2} p={2}>
                <Typography variant="h5" component="div">
                    Book a flight
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4} >
                        <Stack component="form" noValidate spacing={2}>
                            <Typography variant="p" align="left">
                                Locations
                            </Typography>
                            <LocationSelect label="Departure" selected={origin} onChange={(event) => { setOrigin(event.target.value) }} />
                            <LocationSelect label="Destination" selected={destination} onChange={(event) => { setDestination(event.target.value) }} />
                            <FlightTypeSelect label="Flight Type" value={flightType} onChange={(event) => { setFlightType(event.target.value) }} />
                            <Stack component="form" noValidate spacing={2}>
                                <Typography variant="p" align="left">
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
                                            onChange={(e) => {
                                                setReturnDate(e.target.value);
                                            }}
                                            value={returnDate}
                                        />) : null
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack component="form" noValidate spacing={2}>
                            <Typography variant="p" align="left">
                                Passengers
                            </Typography>
                            <Stack direction="row"
                                alignItems="center" spacing={2}>
                                <TextField

                                    id="outlined-number"
                                    label="Adults"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={numAdults}
                                    onChange={(e) => {
                                        setNumAdults(e.target.value);
                                    }}
                                />
                                <TextField

                                    id="outlined-number"
                                    label="Children"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={numChildren}
                                    onChange={(e) => {
                                        setNumChildren(e.target.value);
                                    }}
                                />
                            </Stack>
                            <Stack component="form" noValidate spacing={2}>
                                <Typography variant="p" align="left">
                                    Flight Details
                                </Typography>
                                <FlightClassSelect label="Flight Class" value={flightClass} onChange={(event) => { setFlightClass(event.target.value) }} />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid container item xs={4}>
                        <Stack component="form" noValidate spacing={2}>
                            {printReceipt()}
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={proceedClick} mr={2}>Proceed</Button>
                                <Button variant="contained" onClick={proceedClick} color="error" flex={1}>Cancel</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

            </Stack>
        </Paper>
    );
}


export default Booking;