import * as request from '../request';

// Contract

export const loadContracts = async () => {
    try {
        const res = await request.get('Contract');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
