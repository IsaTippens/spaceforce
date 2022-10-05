import { Button, TextField, Box, Stack, Typography } from "@mui/material";
import LocationSelect from "../location_select/LocationSelect";
import FlightTypeSelect from "../flight_type_select";
import FlightDatePicker from "../flight_date_picker";
function BookingTab(props) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        }}>
            <Stack component="form" noValidate spacing={3}>
                <LocationSelect label="Departure" />
                <LocationSelect label="Destination" />
                <FlightTypeSelect label="Flight Type" />
                <Stack component="form" noValidate spacing={2}>
                    <Typography variant="p" align="left">
                        Date
                    </Typography>
                    <Stack direction="row" justifyContent="space-between"
                        alignItems="center" spacing={2}>
                        <FlightDatePicker label="Departure" />
                        <FlightDatePicker label="Return" />
                    </Stack>
                </Stack>
                <Button variant="contained" size="large" sx={{ width: '100%' }}>
                    Proceed
                </Button>
            </Stack>

        </Box>
    );

}

export default BookingTab;