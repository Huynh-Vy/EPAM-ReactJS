import axios from "axios";
import queryString from 'query-string';
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apikey }),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);


// Add a request interceptor
axiosClient.interceptors.request.use(
    async(config) => config
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;