import axios from 'axios'

const axiosApi = axios.create({
    baseURL: 'http://127.0.0.1:5000',
})
export const ClientBaseURL = 'http://localhost:5173/'
export default axiosApi