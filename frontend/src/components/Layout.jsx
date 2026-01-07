import { useState, useEffect } from 'react';
import { Home, ScanLine, User, Car, Shield, Crown, Clock, Ticket } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import LoginAsPanel from './LoginAsPanel';
export default function Layout({ children }) {
    const location = useLocation();
    const { role } = useRole();
    const isScanner = location.pathname === '/scan';
    const [hasActiveTicket, setHasActiveTicket] = useState(!!sessionStorage.getItem('activeTicket'));
    useEffect(() => {
        const checkTicket = () => {
            setHasActiveTicket(!!sessionStorage.getItem('activeTicket'));
        };
        window.addEventListener('ticketUpdated', checkTicket);
        return () => window.removeEventListener('ticketUpdated', checkTicket);
    }, []);
    const getNavItems = () => {
        switch (role) {
            case 'driver':
                return [
                    { icon: Home, label: 'Home', path: '/' },
                    { icon: Car, label: 'Tasks', path: '/' },
                    { icon: User, label: 'Profile', path: '/' }
                ];
            case 'manager':
                return [
                    { icon: Home, label: 'Overview', path: '/' }
                ];
            case 'admin':
                return [
                    { icon: Home, label: 'Dash', path: '/' },
                    { icon: Shield, label: 'Approvals', path: '/' },
                    { icon: Crown, label: 'Revenue', path: '/' }
                ];
            default:
                return [
                    { icon: Home, label: 'Home', path: '/' },
                    { icon: Ticket, label: 'Ticket', path: '/ticket' },
                    { icon: Clock, label: 'History', path: '/history' },
                    { icon: User, label: 'Settings', path: '/settings' }
                ];
        }
    };
    const navItems = getNavItems();
    return (
        <div className="min-h-screen bg-slate-50 font-outfit">
            <div className="fixed inset-0 bg-blue-50/30 -z-10 pointer-events-none" />
            <div className="w-full min-h-screen flex flex-col relative pb-32">
                <main className="flex-1 animate-fade-in p-4 sm:p-6">
                    {children}
                </main>
                {!isScanner && role !== 'manager' && (
                    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-0 pointer-events-none">
                        <div className="max-w-md mx-auto pointer-events-auto">
                            <div className="glass-panel rounded-2xl p-2 flex justify-between items-center relative">
                                {role === 'user' ? (
                                    <div className="w-full flex justify-between items-center px-2">
                                        {navItems.map((item, idx) => {
                                            const isTicket = item.label === 'Ticket';
                                            const isDisabled = isTicket && !hasActiveTicket;
                                            const isActive = location.pathname === item.path;
                                            if (isDisabled) {
                                                return (
                                                    <div key={idx} className="flex flex-col items-center gap-1 text-slate-300 cursor-not-allowed flex-1 py-1 opacity-50">
                                                        <item.icon size={22} />
                                                        <span className="text-[10px] font-medium">{item.label}</span>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <Link key={idx} to={item.path} className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 py-1 ${isActive ? 'text-indigo-600 scale-110' : 'text-slate-400 hover:text-indigo-500'}`}>
                                                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                                    <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                                                    {isActive && <div className="w-1 h-1 bg-indigo-600 rounded-full absolute -bottom-1" />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <>
                                        {navItems.slice(0, 1).map((item, idx) => (
                                            <Link key={idx} to={item.path} className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 ${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                <item.icon size={24} />
                                            </Link>
                                        ))}
                                        {role !== 'manager' && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <Link to="/" className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all rotate-3 hover:rotate-6">
                                                    <div className="text-2xl font-light">+</div>
                                                </Link>
                                            </div>
                                        )}
                                        {navItems.slice(1).map((item, idx) => (
                                            <Link key={idx} to={item.path} className={`flex flex-col items-center gap-1 transition-all duration-300 flex-1 ${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                <item.icon size={24} />
                                            </Link>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </div>
    );
}