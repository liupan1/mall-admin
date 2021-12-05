import axios from "../axios"

export const login = (params) => {
    return axios.post('/passport/login', params)
}