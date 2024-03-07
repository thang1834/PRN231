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

export const loadUsers = async (options) => {
    try {
        const res = await request.get('User', options);
        return res;
    } catch (error) {
        console.log(error);
    }
};
