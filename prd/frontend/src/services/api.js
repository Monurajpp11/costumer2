import supabase from '../lib/supabase';

// ---- LEADS ----
export const submitLead = async (leadData) => {
    const { data, error } = await supabase
        .from('leads')
        .insert([{
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone || '',
            project_type: leadData.projectType,
            message: leadData.message,
        }])
        .select();

    if (error) throw error.message;
    return data[0];
};

export const fetchLeads = async () => {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error.message;
    return data;
};

export const updateLeadStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select();

    if (error) throw error.message;
    return data[0];
};

export const deleteLead = async (id) => {
    const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

    if (error) throw error.message;
};

// ---- PROJECTS ----
export const fetchProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error.message;
    return data;
};

export const createProject = async (projectData) => {
    const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select();

    if (error) throw error.message;
    return data[0];
};

export const updateProject = async (id, projectData) => {
    const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select();

    if (error) throw error.message;
    return data[0];
};

export const deleteProject = async (id) => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) throw error.message;
};

export const getProjectById = async (id) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error.message;
    return data;
};

// ---- CALCULATOR ----
export const getCalculatorRules = async () => {
    const { data, error } = await supabase
        .from('calculator_rules')
        .select('*')
        .limit(1)
        .single();

    if (error) throw error.message;
    return data;
};

export const calculateEstimate = async (calcData) => {
    try {
        const rules = await getCalculatorRules();

        const basePricePerSqFt = rules.base_price_per_sqft;
        const roomMult = rules.room_multiplier;
        const materialMult = calcData.materialGrade === 'Premium' ? rules.material_multiplier : 1.0;
        const cityMult = calcData.cityMultiplierValue || rules.city_multiplier;

        const base = calcData.sqFt * basePricePerSqFt;
        const roomCost = calcData.rooms * roomMult * 1000;
        const materialCost = materialMult * base;
        const locationCost = cityMult * base;

        return {
            estimate: base + roomCost + materialCost + locationCost,
            breakdown: { base, roomCost, materialCost, locationCost },
        };
    } catch {
        // Fallback calculation if Supabase is unavailable
        const basePrices = { Residential: 2000, Commercial: 2500, Turnkey: 3000 };
        const materialMult = calcData.materialGrade === 'Premium' ? 1.5 : 1.0;
        const locationMult = calcData.cityMultiplierValue || 1.0;
        const base = calcData.sqFt * (basePrices[calcData.propertyType] || 2000);
        const roomCost = calcData.rooms * 1.2 * 10000;
        const total = (base + roomCost) * materialMult * locationMult;
        return { estimate: total };
    }
};

export const updateCalculatorRules = async (rules) => {
    const { data, error } = await supabase
        .from('calculator_rules')
        .update({
            base_price_per_sqft: rules.basePricePerSqFt,
            room_multiplier: rules.roomMultiplier,
            material_multiplier: rules.materialMultiplier,
            city_multiplier: rules.cityMultiplier,
            updated_at: new Date().toISOString(),
        })
        .select()
        .limit(1);

    if (error) throw error.message;
    return data[0];
};

// ---- AUTH ----
export const loginAdmin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error.message;
    return data;
};

export const logoutAdmin = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error.message;
};

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export const onAuthStateChange = (callback) => {
    return supabase.auth.onAuthStateChange(callback);
};
