import axios from "axios";

export const beckend = axios.create({
    baseURL: "https://auth-rg69.onrender.com/api/",
})

beckend.interceptors.request.use(config => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ0OCwiaWF0IjoxNzM2NDE0NTU4LCJleHAiOjE3MzY1MDA5NTh9.NfrA0BUxjRsWgei4yjDJyiySVR-RFh-LuUledWPe3b0"

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;  
})

beckend.interceptors.response.use(response => response, 
    error => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)  