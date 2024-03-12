import * as request from '../request';

// Contract

export const loadContracts = async () => {
    try {
        const res = await request.get('Contract');
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
// User

export const loadUsers = async (headers) => {
    try {
        const res = await request.get('User', headers);
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
