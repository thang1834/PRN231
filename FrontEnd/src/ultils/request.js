import axios from 'axios';

const request = axios.create({
    baseURL: 'https://localhost:7080/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export const put = async (path, options = {}, headers = {}) => {
    const response = await request.put(path, options, headers);
    return response.data;
};

export const del = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};

export default request;
