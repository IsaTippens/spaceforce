import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </LocalizationProvider>
  );
}

export default App;
