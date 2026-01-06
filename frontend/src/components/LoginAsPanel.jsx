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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
            <div className="max-w-4xl mx-auto">
                <p className="text-xs text-gray-500 text-center mb-2 font-medium uppercase tracking-wider">Login As</p>
                <div className="flex justify-center gap-3">
                    {roles.map((r) => {
                        const Icon = r.icon;
                        const isActive = role === r.id;
                        return (
                            <button
                                key={r.id}
                                onClick={() => setRole(r.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[80px] transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={20} className="mb-1" />
                                <span className="text-[10px] font-medium">{r.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
