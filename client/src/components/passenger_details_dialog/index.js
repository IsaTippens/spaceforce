import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PassengerDetailsDialog(props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [passportNum, setPassportNum] = useState('');

    const handlePassportChange = (e) => {
        setPassportNum(e.target.value);
    }

    const handleAgeChange = (e) => {
        let a = e.target.value;
        if (a < 0) {
            setAge(0)
            return
        }
        setAge(a)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setAge(null)
        setName('')
        setPassportNum('')
        setOpen(false);
    };

    const validate = () => {
        if (name.trim().length === 0) {
            alert("Enter your name")
            return false
        }
        if (age == null) {
            alert("Enter your age")
            return false
        }
        if (passportNum.length === 0) {
            alert("Enter your passport number")
            return false
        }
        var reg = /^\d+$/;
        if (!reg.test(passportNum)) {
            alert("Enter only digits in your passport number")
            return false
        }
        return true
    }

    const handleSubmit = () => {
        if (!validate()) {
            return
        }
        var data = {
            name,
            age,
            passportNum
        }
        if (props.onSubmit){
            props.onSubmit(data)
        }
        handleClose()
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Passenger</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your details below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Full Name"
                        type="text"
                        onChange={handleNameChange}
                        value={name}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="age"
                        label="Age"
                        onChange={handleAgeChange}
                        value={age}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="passport"
                        label="Passport Number"
                        type="text"
                        onChange={handlePassportChange}
                        value={passportNum}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Accept</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}