import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Safely parse localStorage
const getSavedUserInfo = () => {
    try {
        return JSON.parse(localStorage.getItem('userInfo'));
    } catch {
        localStorage.removeItem('userInfo');
        return null;
    }
};

// Add a request interceptor to inject token
api.interceptors.request.use(
    (config) => {
        const userInfo = getSavedUserInfo();
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Endpoints
export const submitLead = async (leadData) => {
    try {
        const response = await api.post('/leads', leadData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const calculateEstimate = async (calcData) => {
    try {
        const response = await api.post('/calculator/estimate', calcData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api;
