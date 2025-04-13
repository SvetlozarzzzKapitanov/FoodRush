import API from './api';

export const getAllProducts = async () => {
    const res = await API.get('/products'); // or '/products/category/{name}'
    return res.data;
};
