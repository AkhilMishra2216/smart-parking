import { Search, Plus, Phone, User, MapPin, Clock, X, Check } from 'lucide-react';
import { useState } from 'react';
import ProfileRoleSwitcher from './ProfileRoleSwitcher';

export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState('All');
    const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddDriver = (e) => {
        e.preventDefault();
        setIsAddDriverOpen(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const vehicles = [
        {
            id: 1,
            name: 'Honda City',
            plate: 'MH02AB1234',
            status: 'Parked',
            customer: 'Amit Sharma',
            valet: 'Rajesh Kumar',
            valetId: 'V001',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 09:47 pm',
            duration: '2h 0m',
        },
        {
            id: 2,
            name: 'Maruti Suzuki Swift',
            plate: 'MH12CD5678',
            status: 'Retrieving',
            customer: 'Priya Singh',
            valet: 'Vikram Singh',
            valetId: 'V003',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 08:30 pm',
            duration: '3h 15m',
        },
        {
            id: 3,
            name: 'Toyota Fortuner',
            plate: 'MH01EF9012',
            status: 'Parked',
            customer: 'Rahul Khanna',
            valet: 'Suresh Patil',
            valetId: 'V002',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 10:15 pm',
            duration: '1h 30m',
        },
        {
            id: 4,
            name: 'Hyundai Creta',
            plate: 'MH03GH3456',
            status: 'Retrieved',
            customer: 'Anjali Desai',
            valet: 'Rajesh Kumar',
            valetId: 'V001',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 06:00 pm',
            duration: 'completed',
        },
        {
            id: 5,
            name: 'Kia Seltos',
            plate: 'MH04JK7890',
            status: 'Parked',
            customer: 'Rohan Mehta',
            valet: 'Vikram Singh',
            valetId: 'V003',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 11:00 pm',
            duration: '0h 45m',
        },
        {
            id: 6,
            name: 'BMW X1',
            plate: 'MH05LM1234',
            status: 'Retrieving',
            customer: 'Sneha Patel',
            valet: 'Suresh Patil',
            valetId: 'V002',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 07:45 pm',
            duration: '4h 0m',
        },
        {
            id: 7,
            name: 'Mahindra Thar',
            plate: 'MH47NP5678',
            status: 'Parked',
            customer: 'Arjun Reddy',
            valet: 'Rajesh Kumar',
            valetId: 'V001',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 10:30 pm',
            duration: '1h 15m',
        },
        {
            id: 8,
            name: 'Tata Nexon',
            plate: 'MH02QR9012',
            status: 'Retrieved',
            customer: 'Meera Iyer',
            valet: 'Vikram Singh',
            valetId: 'V003',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            entry: '5 Jan, 05:30 pm',
            duration: 'completed',
        }
    ];

    const tabs = [
        { id: 'All', label: `All (${vehicles.length})` },
        { id: 'Parked', label: `Parked (${vehicles.filter(v => v.status === 'Parked').length})` },
        { id: 'Retrieving', label: `Retrieving (${vehicles.filter(v => v.status === 'Retrieving').length})` },
        { id: 'Retrieved', label: `Retrieved` },
    ];

    const filteredVehicles = activeTab === 'All'
        ? vehicles
        : vehicles.filter(v => v.status === activeTab);

    const stats = [
        { label: 'Active Cars', value: vehicles.filter(v => v.status === 'Parked').length },
        { label: 'Retrieving', value: vehicles.filter(v => v.status === 'Retrieving').length },
        { label: 'Total Today', value: vehicles.length },
        { label: 'Revenue', value: '₹' + (vehicles.length * 165) },
    ];

    return (
        <div className="pb-20 relative">
            <header className="relative p-6 pb-12 text-white">
                <div className="absolute inset-0 bg-slate-900 rounded-b-3xl z-0"></div>

                <div className="relative z-50">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-xl font-bold">Manager Dashboard</h1>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsAddDriverOpen(true)}
                                className="bg-white/10 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-white/20 transition-colors"
                            >
                                <Plus size={14} /> Add Driver
                            </button>
                            <ProfileRoleSwitcher light={true} />
                        </div>
                    </div>
                    <p className="text-slate-400 text-xs">Manage valet assignments and parking operations</p>
                </div>
            </header>

            <div className="px-6 mt-6 space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by plate, customer or valet..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex bg-white p-1 rounded-xl border border-gray-100 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-[80px] text-xs font-medium py-2 rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredVehicles.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-sm">No vehicles found</div>
                    ) : (
                        filteredVehicles.map((v) => (
                            <div key={v.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl">
                                            🚗
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">{v.name}</h3>
                                            <p className="text-xs text-gray-400">{v.plate}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider ${v.status === 'Parked' ? 'bg-green-100 text-green-700' :
                                        v.status === 'Retrieving' ? 'bg-amber-100 text-amber-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {v.status}
                                    </span>
                                </div>

                                <div className="space-y-3 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 flex justify-center"><User size={14} className="text-gray-400" /></div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Customer</p>
                                            <p className="text-sm font-medium text-gray-700">{v.customer}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 flex justify-center"><User size={14} className="text-gray-400" /></div>
                                            <div>
                                                <p className="text-[10px] text-gray-400">Valet Assigned</p>
                                                <p className="text-sm font-medium text-gray-700">{v.valet} <span className="text-gray-400 font-normal text-xs">ID: {v.valetId}</span></p>
                                            </div>
                                        </div>
                                        <button className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                                            <Phone size={14} />
                                        </button>
                                    </div>
                                </div>

                                {v.status !== 'Retrieved' && (
                                    <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-semibold py-2.5 rounded-xl border border-gray-200 transition-colors">
                                        Reassign Valet
                                    </button>
                                )}

                                <div className="mt-4 pt-4 border-t border-dashed border-gray-100 space-y-2">
                                    <div className="flex gap-2.5">
                                        <MapPin size={14} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-700">{v.location}</p>
                                            <p className="text-[10px] text-gray-400">{v.subLocation}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2.5">
                                        <Clock size={14} className="text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-medium text-gray-700">{v.entry}</p>
                                            <p className="text-[10px] text-gray-400">Duration: {v.duration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isAddDriverOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative animate-slide-up">
                        <button
                            onClick={() => setIsAddDriverOpen(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-xl font-bold text-gray-800 mb-1">Add New Driver</h2>
                        <p className="text-sm text-gray-500 mb-6">Enter driver details to register</p>

                        <form onSubmit={handleAddDriver} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
                                <input required type="text" placeholder="e.g. Vikram Singh" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone Number</label>
                                <input required type="tel" placeholder="e.g. 98765 43210" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1.5">License ID</label>
                                <input required type="text" placeholder="e.g. MH12 2018 1234567" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-2">
                                Register Driver
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[60] flex items-center gap-2 animate-bounce-in">
                    <div className="bg-green-500 rounded-full p-0.5"><Check size={12} /></div>
                    <span className="text-sm font-medium">Driver added successfully!</span>
                </div>
            )}
        </div>
    );
}
