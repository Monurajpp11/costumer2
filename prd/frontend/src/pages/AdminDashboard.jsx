import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Trash2, ChevronDown } from 'lucide-react';
import useStore from '../store/useStore';

const AdminDashboard = () => {
    const {
        user, leads, projects, calculatorRules,
        login, logout, checkAuth,
        fetchLeads, fetchProjects, fetchCalculatorRules,
        updateLeadStatus, deleteLead,
        createProject, deleteProject,
        updateCalculatorRules,
    } = useStore();

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('leads');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });

    // Calculator rules form state
    const [rulesForm, setRulesForm] = useState({
        basePricePerSqFt: 2500,
        roomMultiplier: 1.2,
        materialMultiplier: 1.5,
        cityMultiplier: 1.0,
    });
    const [rulesSaved, setRulesSaved] = useState(false);

    // New project form state
    const [showNewProject, setShowNewProject] = useState(false);
    const [newProjectForm, setNewProjectForm] = useState({
        title: '', category: 'Residential', location: '', budget_range: '', description: ''
    });

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (user) {
            fetchLeads();
            fetchProjects();
            fetchCalculatorRules().then(rules => {
                if (rules) {
                    setRulesForm({
                        basePricePerSqFt: rules.base_price_per_sqft,
                        roomMultiplier: rules.room_multiplier,
                        materialMultiplier: rules.material_multiplier,
                        cityMultiplier: rules.city_multiplier,
                    });
                }
            });
        }
    }, [user, fetchLeads, fetchProjects, fetchCalculatorRules]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');
        try {
            await login(loginForm.email, loginForm.password);
        } catch (err) {
            setLoginError(typeof err === 'string' ? err : err.message || 'Invalid credentials');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    const handleSaveRules = async () => {
        try {
            await updateCalculatorRules(rulesForm);
            setRulesSaved(true);
            setTimeout(() => setRulesSaved(false), 3000);
        } catch (err) {
            console.error('Save rules error:', err);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await createProject(newProjectForm);
            setNewProjectForm({ title: '', category: 'Residential', location: '', budget_range: '', description: '' });
            setShowNewProject(false);
        } catch (err) {
            console.error('Create project error:', err);
        }
    };

    // ---------- LOGIN SCREEN ----------
    if (!user) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
                <div className="glass-panel p-10 md:p-14 w-full max-w-md">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif text-white mb-2">Admin Portal</h1>
                        <p className="text-zinc-500 text-sm">Sign in to manage your studio</p>
                    </div>

                    {loginError && (
                        <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-sm mb-6 text-red-400 text-sm">
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-widest text-zinc-500">Email</label>
                            <input
                                type="email" required
                                value={loginForm.email}
                                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                className="w-full bg-dark-surface/50 border-b border-white/10 p-3 text-white focus:border-brand-gold-500 outline-none transition-all font-light"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs uppercase tracking-widest text-zinc-500">Password</label>
                            <input
                                type="password" required
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full bg-dark-surface/50 border-b border-white/10 p-3 text-white focus:border-brand-gold-500 outline-none transition-all font-light"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full bg-brand-gold-500 text-dark-bg py-3 font-medium tracking-widest uppercase text-sm hover:bg-brand-gold-400 disabled:opacity-50 transition-colors"
                        >
                            {isLoggingIn ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ---------- DASHBOARD ----------
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 flex relative">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:z-auto
            `}>
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-xl font-serif text-amber-500">Admin Portal</h2>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>
                <nav className="space-y-2 flex-grow">
                    {['leads', 'projects', 'calculator'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`block w-full text-left px-4 py-3 rounded transition-colors capitalize ${activeTab === tab ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-zinc-800'
                                }`}
                        >
                            {tab === 'calculator' ? 'Calc Rules' : tab}
                        </button>
                    ))}
                </nav>
                <div className="border-t border-zinc-800 pt-4 mt-4">
                    <p className="text-zinc-500 text-xs mb-3 truncate">{user.email}</p>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm px-4 py-2"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 md:p-10 min-w-0">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden text-zinc-400 hover:text-white p-2 -ml-2">
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-serif text-white capitalize">
                        {activeTab === 'calculator' ? 'Calculator Rules' : `${activeTab} Management`}
                    </h1>
                </div>

                {/* ---- LEADS TAB ---- */}
                {activeTab === 'leads' && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase">
                                <tr>
                                    <th className="p-4 border-b border-zinc-800">Name</th>
                                    <th className="p-4 border-b border-zinc-800">Email</th>
                                    <th className="p-4 border-b border-zinc-800">Type</th>
                                    <th className="p-4 border-b border-zinc-800">Status</th>
                                    <th className="p-4 border-b border-zinc-800">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads?.map(lead => (
                                    <tr key={lead.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                                        <td className="p-4 font-medium text-white">{lead.name}</td>
                                        <td className="p-4 text-sm">{lead.email}</td>
                                        <td className="p-4 text-sm">{lead.project_type}</td>
                                        <td className="p-4">
                                            <div className="relative inline-block">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                                    className={`appearance-none pr-6 pl-2 py-1 text-xs rounded-full cursor-pointer border-0 outline-none ${lead.status === 'new' ? 'bg-amber-500/20 text-amber-500' :
                                                            lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                                                                'bg-green-500/20 text-green-400'
                                                        }`}
                                                >
                                                    <option value="new" className="bg-zinc-900 text-white">New</option>
                                                    <option value="contacted" className="bg-zinc-900 text-white">Contacted</option>
                                                    <option value="closed" className="bg-zinc-900 text-white">Closed</option>
                                                </select>
                                                <ChevronDown size={12} className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button onClick={() => deleteLead(lead.id)} className="text-red-400 hover:text-red-300">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!leads || leads.length === 0) && (
                                    <tr><td colSpan="5" className="p-8 text-center text-zinc-500">No leads found. They will appear when visitors submit the contact form.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* ---- PROJECTS TAB ---- */}
                {activeTab === 'projects' && (
                    <>
                        {showNewProject && (
                            <form onSubmit={handleCreateProject} className="bg-zinc-900 border border-zinc-800 rounded p-6 mb-6 space-y-4">
                                <h3 className="text-lg text-white font-medium">New Project</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input required placeholder="Project Title" value={newProjectForm.title}
                                        onChange={e => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-700 p-3 rounded text-white placeholder-zinc-600 outline-none focus:border-amber-500"
                                    />
                                    <select value={newProjectForm.category}
                                        onChange={e => setNewProjectForm({ ...newProjectForm, category: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-700 p-3 rounded text-white outline-none focus:border-amber-500"
                                    >
                                        <option>Residential</option>
                                        <option>Commercial</option>
                                        <option>Turnkey</option>
                                    </select>
                                    <input placeholder="Location" value={newProjectForm.location}
                                        onChange={e => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-700 p-3 rounded text-white placeholder-zinc-600 outline-none focus:border-amber-500"
                                    />
                                    <input placeholder="Budget Range" value={newProjectForm.budget_range}
                                        onChange={e => setNewProjectForm({ ...newProjectForm, budget_range: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-700 p-3 rounded text-white placeholder-zinc-600 outline-none focus:border-amber-500"
                                    />
                                </div>
                                <textarea placeholder="Description" rows="3" value={newProjectForm.description}
                                    onChange={e => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white placeholder-zinc-600 outline-none resize-none focus:border-amber-500"
                                />
                                <div className="flex gap-3">
                                    <button type="submit" className="px-6 py-2 bg-amber-500 text-zinc-950 rounded font-medium text-sm">Create</button>
                                    <button type="button" onClick={() => setShowNewProject(false)} className="px-6 py-2 border border-zinc-700 rounded text-sm hover:bg-zinc-800">Cancel</button>
                                </div>
                            </form>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            <button
                                onClick={() => setShowNewProject(true)}
                                className="h-48 border-2 border-dashed border-zinc-700 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors rounded text-zinc-500"
                            >
                                + Add New Project
                            </button>
                            {projects?.map(project => (
                                <div key={project.id} className="h-48 bg-zinc-900 border border-zinc-800 rounded p-6 flex flex-col justify-between group">
                                    <div>
                                        <span className="text-xs text-amber-500">{project.category}</span>
                                        <h3 className="text-lg text-white font-medium mt-1 line-clamp-1">{project.title}</h3>
                                        <p className="text-xs text-zinc-500 mt-1">{project.location}</p>
                                    </div>
                                    <div className="flex gap-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* ---- CALCULATOR RULES TAB ---- */}
                {activeTab === 'calculator' && (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded max-w-2xl">
                        <h3 className="text-xl text-white mb-6">Pricing Multipliers</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm text-zinc-400">Base Price per SqFt ($)</label>
                                <input
                                    type="number" value={rulesForm.basePricePerSqFt}
                                    onChange={e => setRulesForm({ ...rulesForm, basePricePerSqFt: Number(e.target.value) })}
                                    className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-zinc-400">Room Multiplier</label>
                                <input
                                    type="number" step="0.1" value={rulesForm.roomMultiplier}
                                    onChange={e => setRulesForm({ ...rulesForm, roomMultiplier: Number(e.target.value) })}
                                    className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-zinc-400">Premium Material Multiplier</label>
                                <input
                                    type="number" step="0.1" value={rulesForm.materialMultiplier}
                                    onChange={e => setRulesForm({ ...rulesForm, materialMultiplier: Number(e.target.value) })}
                                    className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-zinc-400">City Multiplier</label>
                                <input
                                    type="number" step="0.1" value={rulesForm.cityMultiplier}
                                    onChange={e => setRulesForm({ ...rulesForm, cityMultiplier: Number(e.target.value) })}
                                    className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white outline-none focus:border-amber-500"
                                />
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <button onClick={handleSaveRules} className="px-6 py-2 bg-amber-500 text-zinc-950 rounded font-medium">
                                    Save Rules
                                </button>
                                {rulesSaved && <span className="text-green-400 text-sm">✓ Saved successfully!</span>}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
