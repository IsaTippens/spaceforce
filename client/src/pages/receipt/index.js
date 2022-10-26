import { useState, useEffect } from 'react';
import { Paper, Typography, Container, Stack, TextField, Button, Breadcrumbs, Grid, List, ListItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Receipt(props) {

    const location = useLocation();
    const navigate = useNavigate();

    const [flightData, setFlightData] = useState({});
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        document.title = "Receipt | SpaceForce Flight Agency";
        if (location.state) {
            setFlightData(location.state.FlightDetails)
            setTickets(location.state.Tickets)
        }
    }, []);

    const proceedClick = () => {
        navigate("/");
    }

    const generateTickets = () => {
        return tickets.map((val, idx) => {
            return buildTicket(val)
        })
    }

    const buildTicket = (t) => {
        return (
            <Paper elevation={2} m={2} >
                <Stack spacing={1} p={1} minWidth={125}>
                    <Typography align={"center"}>
                        Ticket #{t.TicketID}
                    </Typography>
                    <Typography>
                        Passenger:  {t.PassengerName}
                    </Typography>
                    <Typography>
                        Travelling in {flightData.FlightClass} Class
                    </Typography>
                    <Typography>
                        Flying from {flightData.DepartureLocation} to {flightData.DestinationLocation} 
                    </Typography>
                    <Typography>
                        Leaving {flightData.DepartureDate} {flightData.FlightType}
                    </Typography>
                </Stack>
            </Paper>
        );
    }

    return (
        <Paper>
            <Container>
                <Grid container row>
                    <Grid item md={8}>
                        <Stack spacing={2} p={1}>
                            <Typography variant="h5" align="left">
                                Receipt
                            </Typography>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.secondary">Home</Typography>
                                <Typography color="text.secondary">Booking</Typography>
                                <Typography color="text.secondary">Payment</Typography>
                                <Typography color="text.primary">Receipt</Typography>
                            </Breadcrumbs>
                            <Stack spacing={2}>
                                <Typography variant="h6" align="left">
                                    Flight Summary:
                                </Typography>

                                <Typography variant="body1" align="left">
                                    Departing from {location.state.origin} to {location.state.destination} on {location.state.departureDate}.
                                </Typography>

                                <Typography variant="body1" align="left">
                                    Flight Class: {location.state.flightClass}
                                </Typography>

                                <Typography variant="body1" align="left">
                                    Flight Type: {location.state.flightType}
                                </Typography>

                                <Typography variant="h6" align="left">
                                    Passenger tickets:
                                </Typography>
                                <Stack spacing={1} direction={'row'} style={{
                                    display: 'flex',
                                    overflowX: 'auto',
                                }}>
                                    {generateTickets()}
                                </Stack>
                            </Stack >

                            <Stack spacing={2} direction="row" alignItems={"left"}>
                                <Button variant="contained" onClick={proceedClick} mr={2} align="left"  > Exit</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item md={4}>
                        <Stack spacing={2} p={1}>
                            <Typography variant="h5">
                                Thank You 😎
                            </Typography>
                            <Typography variant="body1" >
                                For using Space Force Travel Agency as your first choice !
                            </Typography>
                            <Typography variant="body1" >
                                Have a good flight
                            </Typography>

                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )

}

export default Receipt;