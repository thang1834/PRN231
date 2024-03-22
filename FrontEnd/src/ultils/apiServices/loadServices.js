import * as request from '../request';
//Payment
export const loadPayments = async () => {
    try {
        const res = await request.get('Payment');
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loadPaymentById = async (id) => {
    try {
        const res = await request.get(`Payment/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Contract
export const loadContracts = async (options = {}) => {
    try {
        const res = await request.get('Contract', options);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loadContractById = async (id) => {
    try {
        const res = await request.get(`Contract/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
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
        throw error;
    }
};

export const loadUserById = async (id, headers) => {
    try {
        const res = await request.get(`User/${id}`, headers);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

//Role
export const loadRoles = async (headers) => {
    try {
        const res = await request.get('Role', headers);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// House

export const loadHouses = async () => {
    try {
        const res = await request.get('House');
        return res;
    } catch (error) {
        console.log(error);
        throw error;
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

//
export const loadServices = async (options = {}) => {
    try {
        const res = await request.get('Service', options);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loadServiceById = async (id, options = {}) => {
    try {
        const res = await request.get('Service/' + id, options);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const loadServicesByHouseId = async (id, options = {}) => {
    try {
        const res = await request.get('Service/house/' + id, options);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
