import {get, post, del} from './mysqlapi';

const ENDPOINT = "/api/ticket";

export const getTicket = async (id) => {
    return await get(ENDPOINT + `/{id}`)
} 

export const getTickets = async () => {
    return await get(ENDPOINT)
} 

export const createTicket = async(passengerId, flightId, flightClass, flightType) => {
    return await post(ENDPOINT + "/create", {
        passengerID: passengerId,
        FlightID: flightId,
        flightClass: flightClass,
        flightType: flightType
    })
}

export const deleteTicket = async(id) => {
    return await del(ENDPOINT + `/{id}`)
}
