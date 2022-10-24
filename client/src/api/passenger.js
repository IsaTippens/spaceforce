import {get, post} from './mysqlapi';

const ENDPOINT = "/api/passenger"

export const getPassenger = async (id) => {
    return await get(ENDPOINT + `/{id}`)
}

export const getPassengers = async() => {
    return await get(ENDPOINT)
}