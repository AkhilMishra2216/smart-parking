import { useRole } from '../context/RoleContext';
import { User, Shield, Car, Crown } from 'lucide-react';

export default function LoginAsPanel() {
    const { role, setRole } = useRole();

    const roles = [
        { id: 'user', label: 'User', icon: User },
        { id: 'manager', label: 'Manager', icon: Shield },
        { id: 'driver', label: 'Driver', icon: Car },
        { id: 'admin', label: 'Super Admin', icon: Crown },
    ];

    return (
        <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl bg-white/90 backdrop-blur-lg border border-gray-200 p-4 shadow-2xl rounded-3xl z-50">
            <div>
                <p className="text-[10px] text-gray-500 text-center mb-3 font-bold uppercase tracking-widest">Switch Role</p>
                <div className="flex justify-between items-center px-2">
                    {roles.map((r) => {
                        const Icon = r.icon;
                        const isActive = role === r.id;
                        return (
                            <button
                                key={r.id}
                                onClick={() => setRole(r.id)}
                                className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-slate-900 text-white shadow-lg scale-110'
                                    : 'bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                    }`}
                            >
                                <Icon size={20} className="mb-1.5" />
                                <span className="text-[9px] font-bold">{r.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
