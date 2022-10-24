import axios from "axios"

const URL = process.env.SPACEFORCE_URL || "http://localhost:3002"

export const get = async(endpoint) => {
    return axios.get(URL + endpoint)
}

export const post = async(endpoint, data) => {
    return axios.post(URL + endpoint, data) ;
}