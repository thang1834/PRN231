import { jwtDecode } from 'jwt-decode';
import * as request from './request';

export const isTokenExpired = (token) => {
    if (!token) {
        // Token doesn't exist or is invalid
        return true;
    }
    try {
        // Decode the token to extract expiration time
        const decodedToken = jwtDecode(token);
        // Check if the current time is greater than or equal to the token's expiration time
        return Date.now() >= decodedToken.exp * 1000; // Convert expiration time to milliseconds
    } catch (error) {
        // Failed to decode token
        console.error('Error decoding token:', error);
        return true;
    }
};

export const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (isTokenExpired(accessToken)) {
        try {
            var token = {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
            const response = await request.refreshToken(token);
            console.log(response);
            localStorage.setItem('accessToken', response.token.accessToken);
            localStorage.setItem('refreshToken', response.token.refreshToken);
            console.log('ok');
        } catch (err) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            throw err;
        }
    }
};
