import { MapPin, Clock, User } from 'lucide-react';
export default function CurrentTask({ task, onStart }) {
    return (
        <div className="glass-card p-6 rounded-[1.5rem] animate-slide-up">
            <div className="flex gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm border border-indigo-100">
                    🚙
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">{task.car}</h3>
                    <p className="text-sm text-slate-500 mb-2">{task.plate}</p>
                    <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100">
                        {task.action}
                    </span>
                </div>
            </div>
            <div className="h-px bg-slate-100 w-full mb-6" />
            <div className="space-y-6 relative pl-1">
                <InfoRow icon={User} label="Customer" value={task.customer} />
                <InfoRow icon={MapPin} label="Location" value={task.location} sub={task.subLocation} />
                <InfoRow icon={MapPin} label="Park at" value={task.level} />
                <InfoRow icon={Clock} label="Assigned at" value={task.assignedAt} />
            </div>
            <div className="mt-8">
                <button
                    onClick={onStart}
                    className="w-full btn-primary text-sm font-bold shadow-lg shadow-indigo-500/20"
                >
                    Start Parking
                </button>
            </div>
        </div>
    );
}
function InfoRow({ icon: Icon, label, value, sub }) {
    return (
        <div className="flex gap-4 items-start group">
            <div className="mt-0.5 p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                <Icon className="text-slate-400 group-hover:text-indigo-500 transition-colors" size={18} />
            </div>
            <div>
                <p className="text-[10px] text-slate-400 font-medium mb-0.5 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-semibold text-slate-800">{value}</p>
                {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
            </div>
        </div>
    );
}