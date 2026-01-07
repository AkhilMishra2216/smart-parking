import { Bell } from 'lucide-react';
import { useState } from 'react';
import ProfileRoleSwitcher from './ProfileRoleSwitcher';
import AssignmentCard from './driver/AssignmentCard';
import CurrentTask from './driver/CurrentTask';
import ProgressView from './driver/ProgressView';
export default function DriverConsole() {
    const [retrievalStatus, setRetrievalStatus] = useState('idle');
    const [newAssignments, setNewAssignments] = useState([
        {
            id: 1,
            type: 'new',
            car: 'Maruti Swift',
            plate: 'MH12CD5678',
            action: 'Retrieve Vehicle',
            badgeColor: 'bg-orange-50 text-orange-600 border border-orange-100'
        }
    ]);
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
        setCurrentAssignment({
            id: assignment.id,
            car: assignment.car,
            plate: assignment.plate,
            action: assignment.action,
            customer: 'Priya Verma',
            location: 'Phoenix Mall',
            subLocation: 'Lower Parel, Mumbai',
            level: 'Level 3 - A12',
            assignedAt: '03:24 pm'
        });
    };
    const handleStartRetrieval = () => {
        setRetrievalStatus('in-progress');
        setTimeout(() => {
            setRetrievalStatus('completed');
            setTimeout(() => {
                setRetrievalStatus('idle');
                setCurrentAssignment(null);
            }, 3000);
        }, 3000);
    };
    return (
        <div className="pb-32 bg-slate-50 min-h-screen">
            {}
            <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-b-[3rem] shadow-xl shadow-indigo-200 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl" />
            </div>
            <div className="relative z-20 px-6 pt-8 pb-4">
                <header className="flex justify-between items-center mb-8">
                    <div className="text-white">
                        <p className="text-white/80 text-sm font-medium mb-1">Driver Console</p>
                        <h1 className="text-2xl font-bold tracking-tight">Rajesh Kumar</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <ProfileRoleSwitcher light={true} />
                        <button className="relative w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                            <Bell size={20} className="text-white" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-400 rounded-full border border-indigo-600"></span>
                        </button>
                    </div>
                </header>
                <div className="space-y-6">
                    {newAssignments.length > 0 && (
                        <div className="animate-slide-up">
                            <div className="flex items-center gap-2 mb-4 ml-1">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
                                    {newAssignments.length}
                                </span>
                                <h3 className="text-sm font-semibold text-white/90">New Assignments</h3>
                            </div>
                            {newAssignments.map((assignment) => (
                                <AssignmentCard
                                    key={assignment.id}
                                    assignment={assignment}
                                    onAccept={handleAcceptAssignment}
                                />
                            ))}
                        </div>
                    )}
                    {currentAssignment && (
                        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <h3 className="text-sm font-semibold text-slate-500 mb-4 ml-1 mt-6">Current Assignment</h3>
                            {retrievalStatus === 'idle' ? (
                                <CurrentTask
                                    task={currentAssignment}
                                    onStart={handleStartRetrieval}
                                />
                            ) : (
                                <ProgressView
                                    task={currentAssignment}
                                    status={retrievalStatus}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}