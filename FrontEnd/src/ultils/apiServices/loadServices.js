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
