import BookingTab from '../../components/booking_tab/BookingTab';
import { Paper, Box, Card, CardContent, Typography, Stack, Grid, Tabs, Tab } from '@mui/material';
import { useState, useEffect } from 'react';
import { BookingContext } from '../../global/contexts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}


function Home() {
    const [value, setValue] = useState(0);
    useEffect( () => {
        document.title = "SpaceForce Flight Agency";
    }, []);
    return (
        <Grid container p={2} spacing={2}>
            <Grid item xs={4}>
                <Paper >
                    <Box m={1} p={1} textAlign={"center"}>
                        <Typography variant={"h5"}>
                            Space Force
                        </Typography>
                        <Typography variant={"h5"}>
                            Travel Agency
                        </Typography>
                    </Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={(e, val) => {
                            setValue(val)
                        }} aria-label="basic tabs example">
                            <Tab label="Flight Booking" />
                            <Tab label="Check-In" />
                            <Tab label="Flight Status" />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <BookingTab />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        ¯\_(ツ)_/¯
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        ¯\_(ツ)_/¯
                    </TabPanel>
                </Paper>
            </Grid>
        </Grid>
    );

}


export default Home;