import BookingTab from '../../components/booking_tab/BookingTab';
import { Paper, Box, Card, CardContent, Typography, Stack, Grid, Tabs, Tab } from '@mui/material';
import {useState} from 'react';

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
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  

function Home() {
    const [value, setValue] = useState(0);
    return (
        <Grid container pl={2}>
            <Paper >
                <Stack>
                    <p>
                        Space Force
                        Flight Agency
                    </p>
                </Stack>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={(e, val) => {
                        setValue(val)
                    }} aria-label="basic tabs example">
                        <Tab label="Flight Booking"  />
                        <Tab label="Check-In" />
                        <Tab label="Flight Status"  />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <BookingTab/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    ¯\_(ツ)_/¯
                </TabPanel>
                <TabPanel value={value} index={2}>
                    ¯\_(ツ)_/¯
                </TabPanel>
            </Paper>
        </Grid>
    );

}

const homeStyle = {
    uipill: {
        backgroundColor: 'red',
        padding: "10px",
        borderRadius: "10px",
    },
    tab: {
        padding: "10px",
    }
}

export default Home;