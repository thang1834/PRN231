import { jwtDecode } from 'jwt-decode';

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
