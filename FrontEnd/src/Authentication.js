import { jwtDecode } from 'jwt-decode';

export const refreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken)) {
        try {
            const response = await fetch('https://localhost:7080/api/User/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken }),
            });
            const data = await response.json();
            const newToken = data.token;
            localStorage.setItem('accessToken', newToken.accessToken);
            localStorage.setItem('refreshToken', newToken.refreshToken);
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
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
