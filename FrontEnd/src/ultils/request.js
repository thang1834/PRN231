import axios from 'axios';

const request = axios.create({
    baseURL: 'https://localhost:7080/',
});

export const get = async (path, headers = {}) => {
    const response = await request.get(path, headers);
    return response.data;
};

export const post = async (path, body = {}, options = {}) => {
    const response = await request.post(path, body, options);
    return response.data;
};

export const put = async (path, options = {}, headers = {}) => {
    const response = await request.put(path, options, headers);
    return response.data;
};

export const del = async (path, options = {}, headers = {}) => {
    const response = await request.delete(path, options, headers);
    return response.data;
};

export default request;
