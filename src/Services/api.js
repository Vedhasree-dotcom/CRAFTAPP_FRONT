
import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: BASE_URL,   
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,   

});

export function setAuthToken(token) {
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete api.defaults.headers.common["Authorization"];
}

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {  
    refreshSubscribers.push(cb);
}

api.interceptors.response.use(
    res => res,  
    async err => {
        const originalRequest = err.config;
        if (err.response && err.response.status === 401 && 
            !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    addRefreshSubscriber((token) => {
                        if(token) {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    } else {
                        reject(err);
                    }
                });
            });
        }   
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                const r = await axios.post(`${BASE_URL}/auth/refresh`, {}, {
                    withCredentials: true,
                });
                const { accessToken } = r.data;
                setAuthToken(accessToken);
                onRefreshed(accessToken);
                isRefreshing = false;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshErr) {
                isRefreshing = false;
                onRefreshed(null); 
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(err);
    }
);



export default api;