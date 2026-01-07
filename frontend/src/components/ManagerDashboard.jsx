import { Search, Plus, Check, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from './manager/StatCard';
import VehicleCard from './manager/VehicleCard';
import AddDriverModal from './manager/AddDriverModal';
import ProfileRoleSwitcher from './ProfileRoleSwitcher';
export default function ManagerDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const handleAddDriver = () => {
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
            entry: '7 Jan, 09:40 pm',
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
            entry: '7 Jan, 08:30 pm',
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
            entry: '7 Jan, 10:15 pm',
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
            entry: '7 Jan, 06:00 pm',
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
            entry: '7 Jan, 11:00 pm',
            duration: '0h 45m',
        },
        {
            id: 242,
            name: 'Tata Nexon',
            plate: 'MH02QR9012',
            status: 'Parked',
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
        <div className="bg-[#1e293b] min-h-screen">
            {}
            <div className="bg-[#1e293b] pt-6 pb-6 px-4">
                <header className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-wide">Manager Dashboard</h1>
                            <p className="text-slate-400 text-xs mt-0.5">Manage valet assignments and parking operations</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsAddDriverOpen(true)}
                            className="bg-[#334155] hover:bg-[#475569] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-slate-600"
                        >
                            <Plus size={16} /> Add Driver
                        </button>
                        <ProfileRoleSwitcher />
                    </div>
                </header>
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {stats.map((stat, i) => (
                        <StatCard key={i} label={stat.label} value={stat.value} />
                    ))}
                </div>
            </div>
            {}
            <div className="bg-[#f1f5f9] rounded-t-[2rem] min-h-[calc(100vh-320px)] px-4 pt-6 pb-20">
                {}
                <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by plate, customer or valet..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-slate-400 focus:border-transparent placeholder-slate-400 shadow-sm outline-none"
                    />
                </div>
                {}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`min-w-fit px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeTab === tab.id
                                ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-md'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {}
                <div className="space-y-4">
                    {filteredVehicles.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-slate-500 text-sm">No vehicles found</p>
                        </div>
                    ) : (
                        filteredVehicles.map((v) => (
                            <VehicleCard key={v.id} vehicle={v} />
                        ))
                    )}
                </div>
            </div>
            {isAddDriverOpen && (
                <AddDriverModal onClose={() => setIsAddDriverOpen(false)} onAdd={handleAddDriver} />
            )}
            {showSuccess && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-[60] flex items-center gap-2 animate-slide-up">
                    <div className="bg-emerald-500 rounded-full p-0.5"><Check size={12} /></div>
                    <span className="text-sm font-bold">Driver added successfully!</span>
                </div>
            )}
        </div>
    );
}