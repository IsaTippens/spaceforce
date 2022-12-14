import axios from "axios"

const URL = process.env.REACT_APP_SPACEFORCE_URL || "http://localhost:3002"

export const get = async(endpoint) => {
    let response = await axios.get(URL + endpoint)
    if (response.status != 200) 
        return {
            sucess: false,
            data: []
        }
    return {
        success: true,
        data: response.data
    }
}

export const post = async(endpoint, data) => {
    let response = await axios.post(URL + endpoint, data) ;
    console.log(response)
    if (response.status != 200) {
        return {
            sucess: false,
            data: []
        }
    }
    return {
        success: true,
        data: response.data
    }
}

export const del = async(endpoint) => {
    let response = await axios.delete(URL + endpoint);
    console.log(response)
    if (response.status != 200) {
        return {
            sucess: false,
            data: []
        }
    }
    return {
        success: true,
        data: response.data
    }
}

