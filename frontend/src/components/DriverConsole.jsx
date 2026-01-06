import { Bell, MapPin, Clock, User, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import ProfileRoleSwitcher from './ProfileRoleSwitcher';

export default function DriverConsole() {
    const [retrievalStatus, setRetrievalStatus] = useState('idle'); // idle, in-progress, completed
    const [retrievalSuccess, setRetrievalSuccess] = useState(false);

    // Initial State: No current assignment, one new assignment
    const [newAssignments, setNewAssignments] = useState([
        {
            id: 1,
            type: 'new',
            car: 'Maruti Swift',
            plate: 'MH12CD5678',
            action: 'Retrieve Vehicle',
            badgeColor: 'bg-orange-100 text-orange-700'
        }
    ]);

    // Initialize with Active Assignment matching screenshot
    const [currentAssignment, setCurrentAssignment] = useState({
        id: 2,
        car: 'Honda City',
        plate: 'MH02AB1234',
        action: 'Park Vehicle',
        customer: 'Amit Sharma',
        location: 'Phoenix Mall',
        subLocation: 'Lower Parel, Mumbai',
        level: 'Level 2 - B34',
        assignedAt: '05:56 pm'
    });

    const handleAcceptAssignment = (assignment) => {
        setNewAssignments(prev => prev.filter(a => a.id !== assignment.id));

        // Transform to detailed active job matching Image 2
        setCurrentAssignment({
            id: assignment.id,
            car: assignment.car,
            plate: assignment.plate,
            action: assignment.action,
            customer: 'Priya Verma', // Mock for dynamic accept
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            level: 'Level 3 - A12',
            assignedAt: '03:24 pm'
        });
    };

    const handleStartRetrieval = () => {
        setRetrievalStatus('in-progress');

        // Simulate progress duration
        setTimeout(() => {
            setRetrievalStatus('completed');

            // Allow resetting after success
            setTimeout(() => {
                setRetrievalStatus('idle');
                setCurrentAssignment(null); // Clear job
            }, 3000);
        }, 3000);
    };

    return (
        <div className="pb-32 bg-[#F3F4F9] min-h-screen font-sans">
            {/* Header matching Design */}
            <header className="relative p-6 pb-12 text-white">
                <div className="absolute inset-0 bg-[#4C35DE] rounded-b-[3rem] shadow-none z-0"></div>

                <div className="relative z-50">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-white/90 text-sm font-normal mb-1">Driver Console</p>
                            <p className="text-sm text-white/80 font-light">Welcome back,</p>
                            <h1 className="text-xl font-medium tracking-wide">Rajesh Kumar</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <ProfileRoleSwitcher light={true} />
                            <div className="relative">
                                <Bell size={24} className="text-white" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center border border-[#4C35DE]">1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-5 mt-6 space-y-6 relative z-10">

                {/* New Assignments Card (Always Visible) */}
                {newAssignments.length > 0 && (
                    <div className="animate-slide-up">
                        <div className="flex items-center gap-2 mb-3 ml-1">
                            <Bell size={16} className="text-[#4C35DE]" />
                            <h3 className="text-sm font-semibold text-gray-700">New Assignments</h3>
                        </div>

                        {newAssignments.map((assignment) => (
                            <div key={assignment.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#E0E7FF] text-[#4C35DE] rounded-xl flex items-center justify-center text-xl shrink-0">
                                        🚙
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 leading-tight">{assignment.car}</h4>
                                        <p className="text-xs text-gray-400 font-medium mb-1.5">{assignment.plate}</p>
                                        <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg ${assignment.badgeColor}`}>
                                            {assignment.action}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAcceptAssignment(assignment)}
                                    className="w-full bg-[#4C35DE] hover:bg-[#3f2cb8] text-white py-3 rounded-xl text-sm font-medium shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
                                >
                                    Accept Assignment <ChevronRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Current Assignment (Stacked Below) */}
                {currentAssignment && (
                    <div className="animate-slide-up">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 ml-1">Current Assignment</h3>

                        {/* Conditional Rendering based on Retrieval Status */}
                        {retrievalStatus === 'idle' ? (
                            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">

                                {/* Car Header */}
                                <div className="flex gap-4 mb-6">
                                    <div className="w-14 h-14 bg-[#E0E7FF] text-[#4C35DE] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                                        🚙
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{currentAssignment.car}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{currentAssignment.plate}</p>
                                        <span className="inline-block bg-[#D1FAE5] text-[#065F46] text-[10px] font-bold px-3 py-1 rounded-full">
                                            {currentAssignment.action}
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-gray-50 mb-6" />

                                {/* Details List */}
                                <div className="space-y-7 relative pl-1">
                                    {/* Vertical Layout Line */}
                                    {/* <div className="absolute left-[11px] top-2 bottom-6 w-0.5 bg-gray-100 -z-10"></div> */}

                                    {/* Customer */}
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-0.5">
                                            <User className="text-gray-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-medium mb-0.5">Customer</p>
                                            <p className="text-sm font-semibold text-gray-800">{currentAssignment.customer}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-0.5">
                                            <MapPin className="text-gray-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-medium mb-0.5">Location</p>
                                            <p className="text-sm font-semibold text-gray-800">{currentAssignment.location}</p>
                                            <p className="text-xs text-gray-400">{currentAssignment.subLocation}</p>
                                        </div>
                                    </div>

                                    {/* Park at (Level) */}
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-0.5">
                                            <MapPin className="text-gray-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-medium mb-0.5">Park at</p>
                                            <p className="text-sm font-semibold text-gray-800">{currentAssignment.level}</p>
                                        </div>
                                    </div>

                                    {/* Assigned At */}
                                    <div className="flex gap-4 items-start">
                                        <div className="mt-0.5">
                                            <Clock className="text-gray-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-medium mb-0.5">Assigned at</p>
                                            <p className="text-lg font-semibold text-gray-800">{currentAssignment.assignedAt}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="mt-8">
                                    <button
                                        onClick={handleStartRetrieval}
                                        className="w-full bg-[#4C35DE] hover:bg-[#3f2cb8] text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        Start Parking
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Progress / Success View (Replacing the entire card content)
                            <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
                                <div className="w-24 h-24 bg-[#E0E7FF] text-[#4C35DE] rounded-full flex items-center justify-center text-4xl mb-6 animate-pulse-slow">
                                    🚙
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {retrievalStatus === 'completed' ? 'Task Completed' : 'Parking in progress...'}
                                </h3>

                                <p className="text-gray-500 font-medium mb-1">{currentAssignment.car}</p>
                                <p className="text-xs text-gray-400 mb-8">{currentAssignment.plate}</p>

                                {retrievalStatus === 'in-progress' ? (
                                    <div className="w-full max-w-[200px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#4C35DE] rounded-full animate-progress-indeterminate"></div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-green-500 bg-green-50 px-4 py-2 rounded-full animate-scale-in">
                                        <CheckCircle size={18} />
                                        <span className="text-sm font-bold">Success</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
