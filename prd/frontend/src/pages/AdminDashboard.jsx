import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useStore from '../store/useStore';

const AdminDashboard = () => {
    const { userInfo, leads, projects, fetchLeads, fetchProjects, logout } = useStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('leads');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/');
        } else {
            fetchLeads();
            fetchProjects();
        }
    }, [userInfo, navigate, fetchLeads, fetchProjects]);

    // Close sidebar on tab change (mobile)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 flex relative">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
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
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-zinc-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>
                <nav className="space-y-4 flex-grow">
                    <button
                        onClick={() => handleTabChange('leads')}
                        className={`block w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'leads' ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-zinc-800'}`}
                    >
                        Leads
                    </button>
                    <button
                        onClick={() => handleTabChange('projects')}
                        className={`block w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'projects' ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-zinc-800'}`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => handleTabChange('calculator')}
                        className={`block w-full text-left px-4 py-3 rounded transition-colors ${activeTab === 'calculator' ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-zinc-800'}`}
                    >
                        Calc Rules
                    </button>
                </nav>
                <button
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-red-400 hover:text-red-300 mt-auto text-left px-4 py-3"
                >
                    Logout
                </button>
            </aside>

            <main className="flex-1 p-4 sm:p-6 md:p-10 min-w-0">
                {/* Mobile header with hamburger */}
                <div className="flex items-center gap-4 mb-6 md:mb-10">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden text-zinc-400 hover:text-white p-2 -ml-2"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-2xl md:text-3xl font-serif text-white capitalize">{activeTab} Management</h1>
                </div>

                {activeTab === 'leads' && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded overflow-x-auto">
                        <table className="w-full text-left min-w-[500px]">
                            <thead className="bg-zinc-950 text-zinc-500 text-sm uppercase">
                                <tr>
                                    <th className="p-4 border-b border-zinc-800">Name</th>
                                    <th className="p-4 border-b border-zinc-800">Email</th>
                                    <th className="p-4 border-b border-zinc-800">Type</th>
                                    <th className="p-4 border-b border-zinc-800">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads?.map(lead => (
                                    <tr key={lead._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20">
                                        <td className="p-4">{lead.name}</td>
                                        <td className="p-4">{lead.email}</td>
                                        <td className="p-4">{lead.projectType}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-500">{lead.status}</span>
                                        </td>
                                    </tr>
                                ))}
                                {leads?.length === 0 && (
                                    <tr><td colSpan="4" className="p-8 text-center text-zinc-500">No leads found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <button className="h-48 border-2 border-dashed border-zinc-700 hover:border-amber-500 hover:text-amber-500 flex items-center justify-center transition-colors rounded text-zinc-500">
                            + Add New Project
                        </button>
                        {projects?.map(project => (
                            <div key={project._id} className="h-48 bg-zinc-900 border border-zinc-800 rounded p-6 flex flex-col justify-between group">
                                <div>
                                    <span className="text-xs text-amber-500">{project.category}</span>
                                    <h3 className="text-xl text-white font-medium mt-1">{project.title}</h3>
                                </div>
                                <div className="flex gap-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-sm border-b border-zinc-400 hover:text-white pb-1">Edit</button>
                                    <button className="text-sm border-b border-red-400 text-red-400 hover:text-red-300 pb-1">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'calculator' && (
                    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded max-w-2xl">
                        <h3 className="text-xl text-white mb-6">Pricing Multipliers</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm">Base Price per SqFt ($)</label>
                                <input type="number" defaultValue="2500" className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm">Premium Material Multiplier</label>
                                <input type="number" defaultValue="1.5" step="0.1" className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded text-white" />
                            </div>
                            <button className="mt-4 px-6 py-2 bg-amber-500 text-zinc-950 rounded font-medium">Save Rules</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
