import axios from "axios";
const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
})

instance.interceptors.request.use((config) => {
    return config
}, (err) => Promise.reject(err))

instance.interceptors.response.use((resp) => {
    return resp
}, (err) => Promise.reject(err))

export default instance;