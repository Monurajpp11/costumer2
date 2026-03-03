import { create } from 'zustand';
import {
    loginAdmin,
    logoutAdmin,
    getCurrentUser,
    fetchLeads as apiFetchLeads,
    fetchProjects as apiFetchProjects,
    updateLeadStatus as apiUpdateLeadStatus,
    deleteLead as apiDeleteLead,
    createProject as apiCreateProject,
    updateProject as apiUpdateProject,
    deleteProject as apiDeleteProject,
    updateCalculatorRules as apiUpdateRules,
    getCalculatorRules,
} from '../services/api';

const useStore = create((set, get) => ({
    user: null,
    projects: [],
    leads: [],
    calculatorRules: null,
    isLoading: false,
    error: null,

    // ---- AUTH ----
    setUser: (user) => set({ user }),

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const data = await loginAdmin(email, password);
            set({ user: data.user, isLoading: false });
            return data;
        } catch (error) {
            const msg = typeof error === 'string' ? error : error.message || 'Login failed';
            set({ error: msg, isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        try {
            await logoutAdmin();
        } catch (e) {
            console.warn('Logout error:', e);
        }
        set({ user: null, leads: [], projects: [] });
    },

    checkAuth: async () => {
        try {
            const user = await getCurrentUser();
            set({ user });
            return user;
        } catch {
            set({ user: null });
            return null;
        }
    },

    // ---- LEADS ----
    fetchLeads: async () => {
        set({ isLoading: true, error: null });
        try {
            const leads = await apiFetchLeads();
            set({ leads, isLoading: false });
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error fetching leads', isLoading: false });
        }
    },

    updateLeadStatus: async (id, status) => {
        try {
            await apiUpdateLeadStatus(id, status);
            const leads = get().leads.map(l => l.id === id ? { ...l, status } : l);
            set({ leads });
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error updating lead' });
        }
    },

    deleteLead: async (id) => {
        try {
            await apiDeleteLead(id);
            set({ leads: get().leads.filter(l => l.id !== id) });
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error deleting lead' });
        }
    },

    // ---- PROJECTS ----
    fetchProjects: async () => {
        set({ isLoading: true, error: null });
        try {
            const projects = await apiFetchProjects();
            set({ projects, isLoading: false });
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error fetching projects', isLoading: false });
        }
    },

    createProject: async (projectData) => {
        try {
            const newProject = await apiCreateProject(projectData);
            set({ projects: [newProject, ...get().projects] });
            return newProject;
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error creating project' });
            throw error;
        }
    },

    updateProject: async (id, projectData) => {
        try {
            const updated = await apiUpdateProject(id, projectData);
            set({ projects: get().projects.map(p => p.id === id ? updated : p) });
            return updated;
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error updating project' });
            throw error;
        }
    },

    deleteProject: async (id) => {
        try {
            await apiDeleteProject(id);
            set({ projects: get().projects.filter(p => p.id !== id) });
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error deleting project' });
        }
    },

    // ---- CALCULATOR RULES ----
    fetchCalculatorRules: async () => {
        try {
            const rules = await getCalculatorRules();
            set({ calculatorRules: rules });
            return rules;
        } catch (error) {
            console.warn('Could not fetch calculator rules:', error);
        }
    },

    updateCalculatorRules: async (rules) => {
        try {
            const updated = await apiUpdateRules(rules);
            set({ calculatorRules: updated });
            return updated;
        } catch (error) {
            set({ error: typeof error === 'string' ? error : 'Error updating rules' });
            throw error;
        }
    },
}));

export default useStore;
