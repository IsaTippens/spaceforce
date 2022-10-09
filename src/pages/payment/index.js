import { useState, useEffect } from 'react';
import { Paper, Typography, Box, Container, Stack, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function Payment(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (location.state) {
            setTotal(location.state.total);
        } 
    }, []);
    /*
    Payment
    - Credit card number
    - Expiry date
    - CVV
    Total R1000
    -Confirm button - Cancel Button
    */

    return (
        <Paper>
            <Container>
                <Stack spacing={2} p={1}>
                    <Typography variant="h6" align="left">
                        Payment
                    </Typography>
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
                    </Stack>


                    <Typography variant="body1" align="left">
                        Total: R{total}
                    </Typography>
                    <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{
                        alert("Payment successful!");
                        navigate("/");
                    }} mr={2}>Proceed</Button>
                    <Button variant="contained" onClick={()=>{navigate("/")}} color="error" flex={1}>Cancel</Button>
                    </Stack>
                </Stack>
            </Container>
        </Paper>
    )
}

export default Payment;