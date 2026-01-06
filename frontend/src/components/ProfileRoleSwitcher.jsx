import { useState, useRef, useEffect } from 'react';
import { User, Shield, Car, Crown, LogOut, ChevronDown } from 'lucide-react';
import { useRole } from '../context/RoleContext';

export default function ProfileRoleSwitcher({ light = false }) {
    const { role, setRole } = useRole();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleSwitch = (newRole) => {
        setRole(newRole);
        setIsOpen(false);
    };

    const roles = [
        { id: 'user', label: 'User', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'manager', label: 'Manager', icon: Shield, color: 'text-slate-900', bg: 'bg-slate-100' },
        { id: 'driver', label: 'Driver', icon: Car, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 'admin', label: 'Super Admin', icon: Crown, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform active:scale-95 border-2 ${light
                        ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                        : 'bg-white text-gray-700 border-gray-100 shadow-sm hover:bg-gray-50'
                    }`}
            >
                <User size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in zoom-in-95 origin-top-right">
                    <div className="px-3 py-2 border-b border-gray-50 mb-2">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Switch Role</p>
                    </div>

                    <div className="space-y-1">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                onClick={() => handleSwitch(r.id)}
                                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors ${role === r.id
                                        ? 'bg-gray-50 ring-1 ring-gray-100'
                                        : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.bg} ${r.color}`}>
                                    <r.icon size={16} />
                                </div>
                                <div className="text-left flex-1">
                                    <p className={`text-sm font-semibold ${role === r.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {r.label}
                                    </p>
                                </div>
                                {role === r.id && (
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
