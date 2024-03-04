export const refreshToken = async (token) => {
    try {
        const response = await fetch('https://your-api-url.com/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken: token.accessToken, refreshToken: token.refreshToken }),
        });
        const data = await response.json();
        const newToken = data.token;
        localStorage.setItem('token', newToken);
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};
