import {get, post} from './mysqlapi';

ENDPOINT = "/api/flight"
const getFlight= async (id) => {
    return await get(ENDPOINT + `/{id}`)
} 

const getFlights = async () => {
    return await get(ENDPOINT)
} 

const createFlight = async(departureTime, departureLocationID, destinationID, shipID, carrierID) => {
    return await post(ENDPOINT + "/create", {
        shipID,
        carrierID,
        deptTime: departureTime,
        depLoc: departureLocationID,
        dest: destinationID,
    })
}
