import { CheckCircle, Loader2 } from 'lucide-react';
export default function ProgressView({ task, status }) {
    const isCompleted = status === 'completed';
    return (
        <div className="glass-card p-8 rounded-[1.5rem] min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in relative overflow-hidden">
            {}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />
            <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-8 relative transition-all duration-500 ${isCompleted ? 'bg-emerald-50 text-emerald-500' : 'bg-indigo-50 text-indigo-600'}`}>
                {isCompleted ? (
                    <CheckCircle size={48} className="animate-scale-in" />
                ) : (
                    <div className="animate-bounce">🚙</div>
                )}
                {!isCompleted && (
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                )}
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {isCompleted ? 'Task Completed!' : 'Parking in progress'}
            </h3>
            <p className="text-slate-500 font-medium mb-1 text-lg">{task.car}</p>
            <p className="text-sm text-slate-400 mb-10 bg-slate-100 px-3 py-1 rounded-full">{task.plate}</p>
            {isCompleted ? (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-3 rounded-2xl animate-scale-in border border-emerald-100 font-bold shadow-sm">
                    <CheckCircle size={20} />
                    <span>Success</span>
                </div>
            ) : (
                <div className="w-full max-w-[240px] space-y-2">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full w-2/3 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Updating system...</p>
                </div>
            )}
        </div>
    );
}