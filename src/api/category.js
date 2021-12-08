import axios from '../axios';

export const list = (params) => axios.get('/category/all', { params });