import { X } from 'lucide-react';
export default function AddDriverModal({ onClose, onAdd }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd();
    };
    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-end sm:items-center justify-center p-4 backdrop-blur-md animate-fade-in">
            <div className="glass-panel w-full max-w-sm rounded-3xl p-6 relative animate-slide-up bg-white">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 p-1 rounded-full"
                >
                    <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-slate-800 mb-1">Add New Driver</h2>
                <p className="text-sm text-slate-500 mb-6">Enter driver details to register</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <input required type="text" placeholder="e.g. Vikram Singh" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone Number</label>
                        <input required type="tel" placeholder="e.g. 98765 43210" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">License ID</label>
                        <input required type="text" placeholder="e.g. MH12 2018 1234567" className="input-field" />
                    </div>
                    <button type="submit" className="w-full btn-primary font-bold shadow-lg shadow-indigo-500/30 mt-2">
                        Register Driver
                    </button>
                </form>
            </div>
        </div>
    );
}