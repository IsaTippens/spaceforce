import { useState, useEffect } from 'react';
import { Paper, Typography, Container, Stack, TextField, Button, Breadcrumbs, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Receipt(props) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Receipt | SpaceForce Flight Agency";
      
    }, []);
   
    const proceedClick = () => {
        navigate("/");
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
                                Ticket Number:  {location.state.bookingId}  
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

                                <Typography variant="body1" align="left">
                              
                                </Typography>

                                <Typography variant="h6" align="left">
                                Passenger breakdown: 
                                </Typography> 

                                <Typography variant="body1" align="left">
                                Adult(s):  {location.state.numAdults}
                                </Typography> 

                                <Typography variant="body1" align="left">
                                Child(ren):  {location.state.numChildren}
                                </Typography> 

                                <Typography variant="body1" align="left">
                                Total Cost: R{location.state.total}
                                </Typography>
                            </Stack >

                            <Stack spacing={2} direction="row" alignItems={"left"}>
                                <Button variant="contained" onClick={proceedClick} mr={2} align= "left"  > Exit</Button>
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