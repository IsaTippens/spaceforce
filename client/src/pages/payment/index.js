import { useState, useEffect } from 'react';
import { Paper, Typography, Container, Stack, TextField, Button, Breadcrumbs, Grid, Box, List } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getFlightDetails, createFlight, getFlight } from '../../api/flight';
import { createTicket } from '../../api/ticket'
import { getPassengerByPassport, createPassenger } from '../../api/passenger';
import { getLocationByName } from '../../api/location'

function Payment(props) {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [total, setTotal] = useState(0);
    const [bookingId, setBookingId] = useState("");
    const [passengers, setPassengers] = useState([])

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Payment | SpaceForce Flight Agency";
        if (location.state) {
            setTotal(location.state.total);
            if (location.state.passengerData) {
                setPassengers(location.state.passengerData)
            }

        }
    }, []);
    const backClick = () => {
        navigate("/booking",
            {
                state: location.state,
            });
    }
    const proceedClick = async () => {
        let data = await processPayment();
        navigate("/receipt",
            {
                state: {
                    FlightDetails: data.flightDetails,
                    Tickets: data.tickets,
                    ...location.state
                },
            });
    }

    const processPayment = async () => {
        var bookingData = location.state.bookingData

        let dept = await getLocationByName(bookingData.origin)
        let dest = await getLocationByName(bookingData.destination)
        let flightid = 0;
        let flight = await getFlightDetails(bookingData.departureDate, dept.data[0].LocID, dest.data[0].LocID, 1, 1)

        if (flight.data.length === 0) {
            let result = await createFlight(bookingData.departureDate, dept.data[0].LocID, dest.data[0].LocID, 1, 1)
            flightid = result.data.id
            
        } else {
            flightid = flight.data[0].FlightID
        }
        var tickets = []
        for (const val of passengers) {
            let passId = 0
            let pass = await getPassengerByPassport(val.passportNum)
            if (pass.data.length === 0) {
                let p = await createPassenger(val.name, val.passportNum)
                passId = p.data.id
            } else {
                passId = pass.data[0].PassengerID
            }
            let tick = await createTicket(passId, flightid, bookingData.flightClass, bookingData.flightType)
            let t = {
                PassengerID: passId,
                TicketID: tick.data.id,
                PassengerName: val.name
            }
            tickets.push(t)
        }
        const flightDetails = {
            FlightID: flightid,
            DepartureDate: bookingData.departureDate,
            DepartureLocation: bookingData.origin,
            DestinationLocation: bookingData.destination,
            FlightClass: bookingData.flightClass,
            FlightType: bookingData.flightType
        }
        return {
            tickets,
            flightDetails
        }

    }

    return (
        <Paper>
            <Container>
                <Grid container row>
                    <Grid item xs={8}>
                        <Stack spacing={2} p={1}>
                            <Typography variant="h5" align="left">
                                Complete Payment
                            </Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.secondary">Home</Typography>
                                <Typography color="text.secondary">Booking</Typography>
                                <Typography color="text.primary">Payment</Typography>
                                <Typography color="text.secondary">Receipt</Typography>
                            </Breadcrumbs>
                            <Stack spacing={2}>
                                <TextField
                                    label="Credit card number"
                                    variant="outlined"
                                    value={cardNumber}
                                    onChange={(e) => {
                                        setCardNumber(e.target.value);
                                    }}
                                />

                                <TextField

                                    label="Expiry date"
                                    variant="outlined"
                                    value={expiryDate}
                                    onChange={(e) => {
                                        setExpiryDate(e.target.value);
                                    }}
                                />

                                <TextField

                                    label="CVV"
                                    variant="outlined"
                                    value={cardName}
                                    onChange={(e) => {
                                        setCardName(e.target.value);
                                    }}
                                />
                            </Stack >


                            <Typography variant="body1" align="left">
                                Total: R{total}
                            </Typography>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={backClick} color="error" flex={1}>Back</Button>
                                <Button variant="contained" onClick={proceedClick} mr={2}>Proceed</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack spacing={2} p={1}>
                            <Typography variant="body1" >
                                Departing from {location.state.origin} to {location.state.destination}
                            </Typography>
                            <Typography variant="body1" >
                                {location.state.flightType} flight
                            </Typography>
                            <Typography variant="body1" >
                                Leaving on {location.state && location.state.departureDate} {location.state.flightType === "One-Way" ? "" : "and returning on " + location.state.returnDate}
                            </Typography>
                            <Typography variant="body1">
                                {location.state && location.state.departureTime}
                            </Typography>
                            <Typography variant="h6">
                                Passengers
                            </Typography>
                            <Stack sx={{ overflow: 'auto' }} spacing={1}>
                                {
                                    passengers.map((val) => {
                                        return (
                                            <Typography variant="p" align="left">
                                                {val.name}
                                            </Typography>
                                        )
                                    })
                                }
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Payment;