import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import Booking from './pages/booking';
import Payment from './pages/payment';
import Landing from './pages/landing';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<Home />} />
            <Route path="booking/" element={<Booking />} />
            <Route path="payment/" element={<Payment />} />
          </Route>
        </Routes>
      </Router>

    </LocalizationProvider>
  );
}

export default App;
