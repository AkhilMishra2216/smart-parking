import { ChevronRight } from 'lucide-react';
export default function AssignmentCard({ assignment, onAccept }) {
    return (
        <div className="glass-card p-5 rounded-3xl mb-4 transform transition-all hover:scale-[1.02]">
            <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm border border-indigo-100">
                    🚙
                </div>
                <div>
                    <h4 className="text-base font-bold text-slate-800 leading-tight">{assignment.car}</h4>
                    <p className="text-xs text-slate-400 font-medium mb-1.5">{assignment.plate}</p>
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg ${assignment.badgeColor}`}>
                        {assignment.action}
                    </span>
                </div>
            </div>
            <button
                onClick={() => onAccept(assignment)}
                className="w-full btn-primary flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/20"
            >
                Accept Assignment <ChevronRight size={16} />
            </button>
        </div>
    );
}