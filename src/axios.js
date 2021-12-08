import axios from 'axios';
import store from "./store";
const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => {
    if (config.url.includes('/passport')) {
        return config;
    }
    return {
        ...config,
        params: {
            ...config.params,
            appkey: store.state.user.appkey,
        }
    }

}, (err) => Promise.reject(err));

instance.interceptors.response.use((resp) => {
    if (resp.data.status === 'fail') {
        return Promise.reject(resp.data.msg);
    }
    return resp.data.data;
}, (err) => Promise.reject(err));

export default instance;