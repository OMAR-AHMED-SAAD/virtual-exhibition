import axios from 'axios';

const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
    headers: {
        'Content-Type': 'application/json', 
    },
});

export const ClientBaseURL = import.meta.env.VITE_CLIENT_URL; // Define the client base URL separately.
export default axiosApi;
