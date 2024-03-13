import * as request from '../request';

// Contract

export const loadContracts = async (options = {}) => {
    try {
        const res = await request.get('Contract', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const loadContractById = async (id) => {
    try {
        const res = await request.get(`Contract/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const loadAllContractsByUserId = async (userId, options = {}) => {
    try {
        const res = await request.get(`Contract/user/${userId}`, options);
        return res;
    } catch (error) {
        console.log(error);
    }
};
// User

export const loadUsers = async (headers) => {
    try {
        const res = await request.get('User', headers);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const loadUserById = async (id, headers) => {
    try {
        const res = await request.get(`User/${id}`, headers);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//Role
export const loadRoles = async (headers) => {
    try {
        const res = await request.get('Role', headers);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// House

export const loadHouses = async () => {
    try {
        const res = await request.get('House');
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Category

export const loadCategories = async () => {
    try {
        const res = await request.get('Category');
        return res;
    } catch (error) {
        console.log(error);
    }
};
