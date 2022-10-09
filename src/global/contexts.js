import {useContext, createContext} from 'react';

const UserContext = createContext(null);
const BookingContext = createContext(null);

export {
    UserContext,
    BookingContext
}