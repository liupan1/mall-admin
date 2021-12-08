import axios from '../axios';

export const login = (params) => axios.post('/passport/login', params);
export const logon = (params) => axios.post('/passport/logon', params);
export const getCode = (params) => axios.post('/passport/getCode', params);