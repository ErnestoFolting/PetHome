import axios from 'axios';
export const url = 'https://localhost:7124'

const $api = axios.create({
    withCredentials: true,
    baseURL: url
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios(url + "/api/auth/refresh-token", {
                method: "post",
                withCredentials: true
              }) 
              console.log(response)
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Non Authorized')
        }
    }
    throw error;
})

export default $api;
