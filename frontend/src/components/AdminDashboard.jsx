import { ChevronDown, MapPin, TrendingUp, Ticket, IndianRupee, Car, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboard() {
    // Initial mock state
    const [activeTab, setActiveTab] = useState('overview');
    const [activeParking] = useState(45);
    const [totalTickets] = useState(1247);
    const [todayCollection] = useState(13050);
    const [todayTickets] = useState(87);

    return (
        <div className="pb-32 bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-purple-700 text-white p-6 pb-8 rounded-b-3xl">
                <div className="flex items-center gap-4 mb-4">
                    <button className="p-1 hover:bg-white/10 rounded-lg">
                        <div className="transform rotate-180">➜</div>
                    </button>
                    <h1 className="text-lg font-bold">Super Admin</h1>
                </div>
                <p className="text-purple-200 text-xs">System overview and approvals</p>
            </header>

            <div className="px-6 -mt-4 space-y-6">

                {/* Toggle Tabs */}
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 flex">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 text-sm font-medium py-2.5 rounded-lg transition-all ${activeTab === 'overview'
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('approvals')}
                        className={`flex-1 text-sm font-medium py-2.5 rounded-lg transition-all ${activeTab === 'approvals'
                                ? 'bg-purple-600 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        Approvals
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <>
                        {/* Site Selector */}
                        <div>
                            <p className="text-xs text-gray-500 mb-2 font-medium">Select Site</p>
                            <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center text-left">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Phoenix Mall - Lower Parel</span>
                                </div>
                                <ChevronDown size={16} className="text-gray-400" />
                            </button>
                        </div>

                        {/* Today's Performance */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-white p-1 rounded-md border border-gray-200">
                                    <span className="block w-3 h-3 border-2 border-gray-600 rounded-[2px] mb-[1px]"></span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-700">Today's Performance</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">Tickets Issued</p>
                                    <p className="text-2xl font-bold text-purple-700">{todayTickets}</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">Collection</p>
                                    <p className="text-2xl font-bold text-purple-700">₹{todayCollection.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Overall Statistics */}
                        <div>
                            <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                                <TrendingUp size={16} /> Overall Statistics
                            </h3>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">

                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Ticket className="text-purple-500" size={20} />
                                        <span className="text-sm text-gray-600">Total Tickets</span>
                                    </div>
                                    <span className="font-bold text-gray-800">{totalTickets.toLocaleString()}</span>
                                </div>

                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <IndianRupee className="text-green-600" size={20} />
                                        <span className="text-sm text-gray-600">Total Collection</span>
                                    </div>
                                    <span className="font-bold text-gray-800">₹{(todayCollection + 173400).toLocaleString()}</span>
                                </div>

                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Car className="text-blue-500" size={20} />
                                        <span className="text-sm text-gray-600">Active Parking</span>
                                    </div>
                                    <span className="font-bold text-gray-800">{activeParking}</span>
                                </div>

                            </div>
                        </div>

                        {/* Site Details Card */}
                        <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                            <h4 className="text-sm font-bold text-purple-900 mb-1">Phoenix Mall - Lower Parel</h4>
                            <p className="text-xs text-purple-600">Lower Parel, Mumbai</p>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                            <CheckCircle size={40} className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No more approvals</h3>
                        <p className="text-gray-500 text-sm max-w-[200px]">You're all caught up! Great job.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
