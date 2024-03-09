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
