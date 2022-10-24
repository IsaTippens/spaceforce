import {get, post} from './mysqlapi';

const ENDPOINT = "/api/passenger"

export const getPassengers = async() => {
    return await get(ENDPOINT)
}

export const getPassenger = async (id) => {
    return await get(ENDPOINT + `/${id}`)
}

export const getPassengerByPassport = async (passport) => {
    return await get(ENDPOINT + `/passport/${passport}`)
}

export const createPassenger = async(passengerName, passportNum) => {
    return await post(ENDPOINT + "/create", {
        passportNum,
        passName: passengerName
    })
}