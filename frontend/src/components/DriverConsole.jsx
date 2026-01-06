import { Bell, MapPin, Clock, User, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function DriverConsole() {
    const [loading, setLoading] = useState(false);
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

    const [currentAssignment, setCurrentAssignment] = useState(null);

    const handleAcceptAssignment = (assignment) => {
        setNewAssignments(prev => prev.filter(a => a.id !== assignment.id));

        // Transform to detailed active job matching Image 2
        setCurrentAssignment({
            id: assignment.id,
            car: assignment.car,
            plate: assignment.plate,
            action: assignment.action,
            customer: 'Priya Verma',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            level: 'Level 3 - A12', // changed from parkAt to level/spot
            assignedAt: '01:04 pm'
        });
    };

    const handleStartRetrieval = () => {
        setLoading(true);
        // Simulate network request
        setTimeout(() => {
            setLoading(false);
            setRetrievalSuccess(true);

            // Allow resetting after success (optional UX improvement)
            setTimeout(() => {
                setRetrievalSuccess(false);
                setCurrentAssignment(null); // Clear job
            }, 3000);
        }, 2000);
    };

    return (
        <div className="pb-32 bg-gray-50 min-h-screen font-sans">
            {/* Header matching Design */}
            <header className="bg-blue-700 text-white p-6 pb-24 rounded-b-[2.5rem] shadow-md relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-blue-100/90 text-sm mb-0.5">Driver Console</p>
                        <p className="text-sm text-blue-100/80 font-light">Welcome back,</p>
                        <h1 className="text-xl font-medium tracking-wide">Rajesh Kumar</h1>
                    </div>
                    <div className="relative mt-1">
                        <Bell size={24} className="text-white" />
                        {newAssignments.length > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-700"></span>
                        )}
                    </div>
                </div>
            </header>

            <div className="px-5 -mt-16 space-y-6 relative z-20">

                {/* New Assignments Card (Image 1 Style) */}
                {newAssignments.length > 0 && (
                    <div className="animate-slide-up">
                        <div className="flex items-center gap-2 mb-3 ml-1">
                            <Bell size={16} className="text-blue-600" />
                            <h3 className="text-sm font-semibold text-gray-700">New Assignments</h3>
                        </div>

                        {newAssignments.map((assignment) => (
                            <div key={assignment.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
                                        🚙
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-800 leading-tight">{assignment.car}</h4>
                                        <p className="text-xs text-gray-400 font-medium mb-1.5">{assignment.plate}</p>
                                        <span className="inline-block bg-amber-50 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                            {assignment.action}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAcceptAssignment(assignment)}
                                    className="w-full bg-[#8B80F9] hover:bg-[#7b6ff5] text-white py-3 rounded-xl text-sm font-medium shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
                                >
                                    Accept Assignment <ChevronRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Current Assignment (Image 2 Style) */}
                {currentAssignment && (
                    <div className="animate-slide-up">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 ml-1">Current Assignment</h3>
                        <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100">

                            {/* Car Header */}
                            <div className="flex gap-4 mb-6">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                                    🚙
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{currentAssignment.car}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{currentAssignment.plate}</p>
                                    <span className="inline-block bg-amber-50 text-amber-600 text-[10px] font-bold px-3 py-1 rounded-full">
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

                                {/* Retrieve From (Level) */}
                                <div className="flex gap-4 items-start">
                                    <div className="mt-0.5">
                                        <MapPin className="text-gray-400" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium mb-0.5">Retrieve from</p>
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

                            {/* Action Button Section with specific state handling */}
                            <div className="mt-8">
                                {retrievalSuccess ? (
                                    <div className="w-full bg-green-500 text-white py-3.5 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2 animate-in fade-in zoom-in">
                                        <CheckCircle size={20} /> Vehicle Retrieved
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleStartRetrieval}
                                        disabled={loading}
                                        className="w-full bg-[#5D5FEF] hover:bg-[#4d4fd9] text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Start Retrieval'}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                )}

                {/* Empty State */}
                {newAssignments.length === 0 && !currentAssignment && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in opacity-50">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Bell size={24} className="text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">No active assignments</p>
                    </div>
                )}
            </div>
        </div>
    );
}
