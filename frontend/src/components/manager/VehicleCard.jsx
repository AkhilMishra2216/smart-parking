import { User, Phone, MapPin, Clock, Banknote, Car } from 'lucide-react';
export default function VehicleCard({ vehicle }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Parked': return 'bg-emerald-100 text-emerald-700';
            case 'Retrieving': return 'bg-amber-100 text-amber-700';
            case 'Retrieved': return 'bg-slate-100 text-slate-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            {}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                        <Car size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{vehicle.name}</h3>
                        <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{vehicle.plate}</p>
                    </div>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${getStatusStyle(vehicle.status)}`}>
                    {vehicle.status}
                </span>
            </div>
            <div className="space-y-4">
                {}
                <div className="flex items-start gap-3">
                    <div className="w-5 flex justify-center mt-0.5"><User size={16} className="text-slate-400" /></div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Customer</p>
                        <p className="text-sm font-semibold text-slate-700">{vehicle.customer}</p>
                    </div>
                </div>
                {}
                <div className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                        <div className="w-5 flex justify-center mt-0.5"><User size={16} className="text-slate-400" /></div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Valet Assigned</p>
                            <p className="text-sm font-semibold text-slate-700">{vehicle.valet}</p>
                            <p className="text-xs text-slate-400 font-medium">ID: {vehicle.valetId}</p>
                        </div>
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                        <Phone size={16} />
                    </button>
                </div>
                {}
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium py-2.5 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2">
                    <User size={14} />
                    Reassign Valet
                </button>
                {}
                <div className="pt-3 border-t border-slate-50 space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="w-5 flex justify-center mt-0.5"><MapPin size={16} className="text-slate-400" /></div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Location</p>
                            <p className="text-sm font-semibold text-slate-700">{vehicle.location}</p>
                            <p className="text-xs text-slate-400">{vehicle.subLocation}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-5 flex justify-center mt-0.5"><Clock size={16} className="text-slate-400" /></div>
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Entry Time</p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-slate-700">{vehicle.entry}</p>
                                <span className="text-xs text-slate-400">• {vehicle.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-5 flex justify-center"><Banknote size={16} className="text-slate-400" /></div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium">Payment</p>
                        <p className="text-sm font-bold text-slate-900">₹150</p>
                    </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Paid
                </span>
            </div>
        </div>
    );
}