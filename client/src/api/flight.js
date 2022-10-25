import {get, post} from './mysqlapi';

const ENDPOINT = "/api/flight";

export const getFlight= async (id) => {
    return await get(ENDPOINT + `/${id}`)
} 

export const getFlightDetails = async (date, deptid, destid, shipid, carrid) => {
    return await get(ENDPOINT + `/${date}/${deptid}/${destid}/${shipid}/${carrid}`)
} 

export const getFlights = async () => {
    return await get(ENDPOINT)
} 

export const createFlight = async(departureTime, departureLocationID, destinationID, shipID, carrierID) => {
    return await post(ENDPOINT + "/create", {
        shipID,
        carrierID,
        deptTime: departureTime,
        depLoc: departureLocationID,
        dest: destinationID,
    })
}
