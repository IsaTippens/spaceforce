import {get, post} from './mysqlapi';

const ENDPOINT = '/api/spaceship'
export const getSpaceShip = async(id) => {
    return await get(ENDPOINT + `/${id}`)
}

export const getSpaceShips = async() => {
    return await get(ENDPOINT)
}