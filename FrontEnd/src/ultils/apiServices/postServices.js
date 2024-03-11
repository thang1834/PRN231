import * as request from '../request';

// create Contract

export const postContract = async (body, options) => {
    try {
        const res = await request.post('Contract', body, options);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// update contract
export const updateContract = async (id, body, options) => {
    try {
        const res = await request.put(`Contract/${id}`, body, options);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

//delete Contract
export const deleteContract = async (id) => {
    try {
        const res = await request.del(`Contract/${id}`);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// create User
export const postUser = async (options, headers) => {
    try {
        const res = await request.post('User', options, headers);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// update user
export const updateUser = async (id, options, headers) => {
    try {
        const res = await request.put(`User/${id}`, options, headers);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
        console.log(headers);
    }
};

//delete user
export const deleteUser = async (id, options) => {
    try {
        const res = await request.del(`User/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

//assign role
export const assignRole = async (options, headers) => {
    try {
        const res = await request.post(`User/addRoles`, options, headers);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// create Role
export const postRole = async (options, headers) => {
    try {
        const res = await request.post('Role', options, headers);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// update user
export const updateRole = async (id, options, headers) => {
    try {
        const res = await request.put(`Role/${id}`, options, headers);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
        console.log(headers);
    }
};

//delete user
export const deleteRole = async (id, options, headers) => {
    try {
        const res = await request.del(`Role/${id}`, headers);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// Create House
export const postHouse = async (options) => {
    try {
        const res = await request.post('House', options);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// Update House
export const updateHouse = async (id, options) => {
    try {
        const res = await request.put(`House/${id}`, options);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};

// Delete House
export const deleteHouse = async (id) => {
    try {
        const res = await request.del(`House/${id}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
