import { create } from 'zustand';
import api from '../services/api';

const getSavedUserInfo = () => {
    try {
        return JSON.parse(localStorage.getItem('userInfo'));
    } catch {
        localStorage.removeItem('userInfo');
        return null;
    }
};

const useStore = create((set) => ({
    userInfo: getSavedUserInfo(),
    projects: [],
    leads: [],
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data, isLoading: false });
            return data;
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, isLoading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('userInfo');
        set({ userInfo: null });
    },

    fetchProjects: async () => {
        set({ isLoading: true });
        try {
            const { data } = await api.get('/projects');
            set({ projects: data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching projects', isLoading: false });
        }
    },

    fetchLeads: async () => {
        set({ isLoading: true });
        try {
            const { data } = await api.get('/leads');
            set({ leads: data, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Error fetching leads', isLoading: false });
        }
    }
}));

export default useStore;
