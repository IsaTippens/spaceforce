import {get, post, del} from './mysqlapi';

ENDPOINT = "/api/ticket"

const getTicket = async (id) => {
    return await get(ENDPOINT + `/{id}`)
} 

const getTickets = async () => {
    return await get(ENDPOINT)
} 

const createTicket = async(passengerId, flightId, flightClass, flightType) => {
    return await post(ENDPOINT + "/create", {
        passengerID: passengerId,
        FlightID: flightId,
        flightClass: flightClass,
        flightType: flightType
    })
}

const deleteTicket = async(id) => {
    return await del(ENDPOINT + `/{id}`)
}
