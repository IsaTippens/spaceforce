import {get, post} from './mysqlapi';

const ENDPOINT = '/api/spacecarrier'
export const getSpaceCarrier = async(id) => {
    return await get(ENDPOINT + `/${id}`)
}

export const getSpaceCarriers = async() => {
    return await get(ENDPOINT)
}