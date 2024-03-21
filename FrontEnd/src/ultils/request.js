import axios from 'axios';
import { refresh } from './Authentication';

const request = axios.create({
    baseURL: 'http://localhost:5277/',
});

export const refreshToken = async (body, headers) => {
    const res = await request.post('User/refresh-token', body, headers);
    //console.log(res);
    return res.data;
};

export const get = async (path, headers = {}) => {
    await refresh();
    const response = await request.get(path, headers);
    return response.data;
};

export const post = async (path, body = {}, options = {}) => {
    await refresh();
    const response = await request.post(path, body, options);
    return response.data;
};

export const put = async (path, options = {}, headers = {}) => {
    await refresh();
    const response = await request.put(path, options, headers);
    return response.data;
};

export const del = async (path, headers = {}) => {
    await refresh();
    const response = await request.delete(path, headers);
    return response.data;
};

export default request;
