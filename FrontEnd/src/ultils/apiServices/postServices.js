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
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        console.log(options);
    }
};
