import { useState, useEffect } from 'react';
import { Paper, Typography, Container, Stack, TextField, Button, Breadcrumbs, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Payment(props) {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [total, setTotal] = useState(0);
    const [bookingId, setBookingId] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Payment | SpaceForce Flight Agency";
        setBookingId(genID());
        if (location.state) {
            setTotal(location.state.total);
        }
    }, []);
    const backClick = () => {
        navigate("/booking",
            {
                state: location.state,
            });
    }
    const proceedClick = () => {
        navigate("/receipt",
            {
                state: location.state,
            });
    }

    const genID = () => {
        let id = "#";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        for (let i = 0; i < 3; i++) {
            id += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 3; i++) {
            id += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        return id;
    }

    const children = (num) => {
        if (num <= 0) {
            return null
        }
        if (num === 1) {
            return "1 Child";
        }
        return num + " Children";
    }

    const adults = (num) => {
        if (num <= 0) {
            return null
        }
        if (num === 1) {
            return "1 Adult";
        }
        return num + " Adults";
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
                            <Typography variant="h5">
                                Ticket {bookingId}
                            </Typography>
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
                            <Typography variant="body1">
                                {adults(location.state.numAdults)}
                            </Typography>
                            <Typography variant="body1">
                                {children(location.state.numChildren)}
                            </Typography>

                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Payment;