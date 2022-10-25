import { Button, TextField, Box, Stack, Typography, Paper, Grid, Container, List, ListItem, IconButton, ListItemText, Breadcrumbs } from "@mui/material";
import LocationSelect from "../../components/location_select";
import FlightTypeSelect from "../../components/flight_type_select";
import FlightDatePicker from "../../components/flight_date_picker";
import FlightClassSelect from "../../components/flight_class_select";
import PassengerDetailsDialog from '../../components/passenger_details_dialog';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Close} from '@mui/icons-material';

function Booking(props) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flightType, setFlightType] = useState('');
    const [flightClass, setFlightClass] = useState("Economy");
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [numAdults, setNumAdults] = useState(0);
    const [numChildren, setNumChildren] = useState(0);
    const [passengers, setPassengers] = useState([])
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.title = "Booking | SpaceForce Flight Agency";
        if (location.state) {
            if (location.state.bookingData) {
                let bd = location.state.bookingData;
                setOrigin(bd.origin);
                setDestination(bd.destination);
                setFlightType(bd.flightType);
                setDepartureDate(bd.departureDate);
                setReturnDate(bd.returnDate);
            }
            if (location.state.passengerData) {
                setPassengers(location.state.passengerData)
            }
        }
        let s = location.state;
        if (s.flightClass) {
            setFlightClass(s.flightClass);
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

    const adultAge = 18;

    useEffect(() => {
        setNumAdults(calcAdults())
        setNumChildren(calcChildren())
    }, [passengers])

    const calcAdults = () => {
        var adults = 0;
        passengers.forEach((value, idx) => {
            if (value.age >= adultAge) {
                adults++;
            }
        })
        return adults;
    }
    const calcChildren = () => {
        var kids = 0;
        passengers.forEach((value, idx) => {
            if (value.age < adultAge) {
                kids++;
            }
        })
        return kids;
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
        if (passengers.length === 0) {
            alert("There needs to be atleast 1 Passenger booking")
            return
        }
        let t = getTotal()
        const bookingInfo = {
            origin,
            destination,
            flightType,
            flightClass,
            departureDate,
            returnDate,
        }
        navigate("/payment", {
            state: {
                origin,
                destination,
                flightType,
                flightClass,
                departureDate,
                returnDate,
                numAdults,
                numChildren,
                bookingData: bookingInfo,
                passengerData: passengers,
                total: t
            }
        })
    }

    const removePassenger = (id) => {
        var temp = [...passengers]
        temp.splice(id,1)
        setPassengers(temp)
    }

    const generatePassengers = () => {
        return passengers.map((value, index) => {
            return (
                <ListItem key={index} component="div" secondaryAction={
                    <IconButton aria-label="comment" onClick={() => {
                        removePassenger(index)
                    }}>
                        <Close />
                    </IconButton>
                }>
                    <ListItemText primary={value.name} secondary={`Passport No: ${value.passportNum} - Age: ${value.age}`} />
                </ListItem>
            )
        })
    }

    const backClick = () => {
        const bookingInfo = {
            origin,
            destination,
            flightType,
            flightClass,
            departureDate,
            returnDate,
        }
        navigate("/", {
            state: {
                origin,
                destination,
                flightType,
                departureDate,
                returnDate,
                bookingData: bookingInfo
            }
        })
    }


    const getTotal = () => {
        let adultPrice = prices[flightClass]["Adult"];
        let childPrice = prices[flightClass]["Child"];
        let total = (adultPrice * numAdults) + (childPrice * numChildren);
        return total;
    }

    const onPassengerSubmit = (data) => {
        console.log(data)
        var temp = [...passengers]
        temp.push(data)
        setPassengers(temp)
    }

    return (
        <Paper>
            <Stack spacing={2} p={2} sx={{ height: '100%' }}>
                <Typography variant="h5" component="div">
                    Book a flight
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.secondary">Home</Typography>
                    <Typography color="text.primary">Booking</Typography>
                    <Typography color="text.secondary">Payment</Typography>
                    <Typography color="text.secondary">Receipt</Typography>
                </Breadcrumbs>
                <Grid container spacing={2}>
                    <Grid item sm={12} md={4} >
                        <Stack spacing={2}>
                            <Typography variant="p" align="left">
                                Locations
                            </Typography>
                            <LocationSelect label="Departure" selected={origin} onChange={(event) => { setOrigin(event.target.value) }} defaultValue={"Earth"} />
                            <LocationSelect label="Destination" selected={destination} onChange={(event) => { setDestination(event.target.value) }} defaultValue={"Mars"} />
                            <FlightTypeSelect label="Flight Type" value={flightType} onChange={(event) => { setFlightType(event.target.value) }} />
                            <Stack spacing={2}>
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
                    <Grid item sm={12} md={4} flex={1}>
                        <Stack direction={"column"} spacing={2} flex={1}>
                            <Typography variant="p" align="left">
                                Passengers
                            </Typography>
                            
                            <Stack direction="column"
                                alignItems="left" spacing={2} flex={2}>
                                <Paper style={{ maxHeight: '100%' }}>
                                    <List sx={{
                                        maxHeight: 200,
                                        minHeight: 200,
                                        flex: 1,
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'auto',
                                        bgcolor: '#424242'
                                    }}

                                    >
                                        {generatePassengers()}
                                    </List>
                                </Paper>
                                <PassengerDetailsDialog onSubmit={onPassengerSubmit}/>
                            </Stack>
                            <Stack spacing={2}>
                                <Typography variant="p" align="left">
                                    Flight Details
                                </Typography>
                                <FlightClassSelect label="Flight Class" value={flightClass} onChange={(event) => { setFlightClass(event.target.value) }} />
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid container item sm={12} md={4}>
                        <Stack spacing={2}>
                            {printReceipt()}
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={backClick} color="error" flex={1}>Back</Button>
                                <Button variant="contained" onClick={proceedClick} mr={2}>Proceed</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

            </Stack>
        </Paper>
    );
}


export default Booking;