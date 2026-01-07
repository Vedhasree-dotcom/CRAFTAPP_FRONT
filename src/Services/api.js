
import axios from 'axios';
// Vite exposes env vars via import.meta.env and 
// requires the VITE_prefix for client-side vars

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Creating an Axios Instance
const api = axios.create({
    baseURL: BASE_URL,    //Every API call using this instance will automatically 
                           // use the base URL defined earlier.
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,   // Send/receive httpOnly cookies
    //  (refresh token)

});

export function setAuthToken(token) {
    if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete api.defaults.headers.common["Authorization"];
}

// Simple refresh flow: when a 401 is encountered, attempt to call / api/auth/refresh
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
    refreshSubscribers = [];  // Clear subscribers after notifying

}
// add a subscriber callback to be called after token is refreshed
function addRefreshSubscriber(cb) {  
    refreshSubscribers.push(cb);
}

// response interceptor to handle 401 errors
api.interceptors.response.use(
    res => res,  // If the response is successful, just return it
    async err => {
        const originalRequest = err.config;
        if (err.response && err.response.status === 401 && 
            !originalRequest._retry) {
            if (isRefreshing) {
                // If a refresh is already in progress, queue the request   
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
                const r = await axios.post(`${BASE_URL}/api/auth/refresh`, {}, {
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
                onRefreshed(null); // Notify subscribers that refresh failed
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(err);
    }
);



export default api;