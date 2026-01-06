import { Bell, MapPin, Clock, User, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function DriverConsole() {
    const [newAssignments, setNewAssignments] = useState([
        {
            id: 1,
            type: 'new',
            car: 'Maruti Swift',
            plate: 'MH12CD5678',
            action: 'Retrieve Vehicle'
        }
    ]);

    const [currentAssignment, setCurrentAssignment] = useState({
        id: 'current-1',
        car: 'Honda City',
        plate: 'MH02AB1234',
        action: 'Park Vehicle',
        customer: 'Amit Sharma',
        location: 'Phoenix Mall',
        subLocation: 'Lower Parel, Mumbai',
        parkAt: 'Level 2 - B34',
        assignedAt: '11:47 pm'
    });

    const handleAcceptAssignment = (assignment) => {
        // Remove from new assignments
        setNewAssignments(prev => prev.filter(a => a.id !== assignment.id));

        // Set as current assignment (mock data transformation)
        setCurrentAssignment({
            id: assignment.id,
            car: assignment.car,
            plate: assignment.plate,
            action: assignment.action,
            customer: 'New Customer', // Mock data
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            parkAt: 'Assigned Spot',
            assignedAt: 'Just now'
        });
    };

    return (
        <div className="pb-32 bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white p-6 pb-20 rounded-b-[2.5rem]">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-blue-100 text-xs mb-1">Driver Console</p>
                        <p className="text-sm opacity-80">Welcome back,</p>
                        <h1 className="text-xl font-bold">Rajesh Kumar</h1>
                    </div>
                    <div className="relative">
                        <Bell size={20} />
                        {newAssignments.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-600"></span>
                        )}
                    </div>
                </div>
            </header>

            <div className="px-6 -mt-12 space-y-6">

                {/* New Assignments */}
                {newAssignments.length > 0 && (
                    <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 px-1">
                            <Bell size={16} className="text-blue-600" /> New Assignments
                        </h3>
                        <div className="space-y-4">
                            {newAssignments.map((assignment) => (
                                <div key={assignment.id} className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-blue-500 relative overflow-hidden">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg">
                                                🚗
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800">{assignment.car}</h4>
                                                <p className="text-xs text-gray-500">{assignment.plate}</p>
                                            </div>
                                        </div>
                                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md">{assignment.action}</span>
                                    </div>

                                    <button
                                        onClick={() => handleAcceptAssignment(assignment)}
                                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
                                    >
                                        Accept Assignment <ChevronRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Assignment */}
                {currentAssignment && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-700 mb-3 px-1">Current Assignment</h3>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">
                                        🚙
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{currentAssignment.car}</h3>
                                        <p className="text-sm text-gray-500">{currentAssignment.plate}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{currentAssignment.action}</span>
                            </div>

                            <div className="space-y-6 relative">
                                {/* Decorative Line */}
                                <div className="absolute left-[11px] top-2 bottom-8 w-0.5 bg-gray-100 -z-10"></div>

                                <div className="flex gap-4">
                                    <User className="text-gray-400 bg-white ring-4 ring-white" size={24} />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Customer</p>
                                        <p className="font-bold text-gray-700">{currentAssignment.customer}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <MapPin className="text-gray-400 bg-white ring-4 ring-white" size={24} />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Location</p>
                                        <p className="font-bold text-gray-700">{currentAssignment.location}</p>
                                        <p className="text-xs text-gray-500">{currentAssignment.subLocation}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <MapPin className="text-gray-400 bg-white ring-4 ring-white" size={24} />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Park At</p>
                                        <p className="font-bold text-gray-700">{currentAssignment.parkAt}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Clock className="text-gray-400 bg-white ring-4 ring-white" size={24} />
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">Assigned At</p>
                                        <p className="font-bold text-gray-700">{currentAssignment.assignedAt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
