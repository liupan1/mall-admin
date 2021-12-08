import axios from '../axios';

export const getProduct = (params) => axios.get('/products/all', { params });
export const removeProduct = (params) => axios.delete(`/products/+${params.id}`);
export const addProduct = (params) => axios.post("/products/add", params);
export const detail = (params) => axios.get(`/products/${params}`);
export const editProduct = (params) => axios.put("/products/edit", params);