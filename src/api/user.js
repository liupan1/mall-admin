import axios from '../axios';

export const login = (params) => axios.post('/passport/login', params);