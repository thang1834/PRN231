import { jwtDecode } from 'jwt-decode';
import * as postService from './apiServices/postServices';

export const refreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken)) {
        try {
            var token = {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
            const response = await postService.refresh(token, {
                'Content-Type': 'application/json',
            });
            const data = await response.json();
            const newToken = data.token;
            console.log('refresh successfully');
            localStorage.setItem('accessToken', newToken.accessToken);
            localStorage.setItem('refreshToken', newToken.refreshToken);
        } catch (error) {}
    }
};

const isTokenExpired = (token) => {
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
