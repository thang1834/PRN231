import * as request from '../request';

export const refresh = async (body, headers) => {
    try {
        const res = await request.post('User/refresh-token', body, headers);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// create Contract

export const postContract = async (body, options) => {
    try {
        const res = await request.post('Contract', body, options);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
        throw error;
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
        throw error;
    }
};

//delete Contract
export const deleteContract = async (id, options = {}) => {
    try {
        const res = await request.del(`Contract/${id}`, options);
        //console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
    }
};

//change password
export const changePassword = async (id, options, headers) => {
    try {
        const res = await request.post(`User/changepassword/${id}`, options, headers);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
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
        throw error;
    }
};

// Create payment
export const postPayment = async (body, options = {}) => {
    try {
        const res = await request.post(`Payment`, body, options);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Update Payment
export const updatePayment = async (body, options = {}) => {
    try {
        const res = await request.put(`Payment`, body, options);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deletePayment = async (id, options = {}) => {
    try {
        const res = await request.del(`Payment/${id}`, options);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
