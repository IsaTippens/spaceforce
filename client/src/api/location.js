import {get, post} from './mysqlapi';

const ENDPOINT = '/api/location';

export const getLocation = async(id) => {
    return await get(ENDPOINT + `/${id}`)
}

export const getLocationByName = async(name) => {
    return await get(ENDPOINT + `/name/${name}`)
}

export const getLocations = async() => {
    return await get(ENDPOINT)
}