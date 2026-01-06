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
                    { icon: Home, label: 'Overview', path: '/' },
                    { icon: Car, label: 'Fleet', path: '/' },
                    { icon: User, label: 'Drivers', path: '/' }
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
        <div className="min-h-screen bg-[#F3F4F9]">
            <div className="w-full bg-[#F3F4F9] min-h-screen flex flex-col relative pb-32">
                <main className="flex-1">
                    {children}
                </main>

                {!isScanner && (
                    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white border-t border-gray-200 safe-area-pb">
                        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">

                            {role === 'user' ? (
                                <div className="w-full flex justify-between items-center px-2">
                                    {navItems.map((item, idx) => {
                                        const isTicket = item.label === 'Ticket';
                                        const isDisabled = isTicket && !hasActiveTicket;

                                        if (isDisabled) {
                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-1 text-gray-300 cursor-not-allowed flex-1 py-1 opacity-50">
                                                    <item.icon size={24} />
                                                    <span className="text-[10px] font-medium">{item.label}</span>
                                                </div>
                                            );
                                        }

                                        return (
                                            <Link key={idx} to={item.path} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors flex-1 py-1">
                                                <item.icon size={24} className={location.pathname === item.path ? 'text-blue-600' : ''} />
                                                <span className={`text-[10px] font-medium ${location.pathname === item.path ? 'text-blue-600' : ''}`}>{item.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <>
                                    {navItems.slice(0, 1).map((item, idx) => (
                                        <Link key={idx} to={item.path} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
                                            <item.icon size={24} />
                                        </Link>
                                    ))}

                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Link to="/" className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-gray-50 hover:scale-105 active:scale-95 transition-all">
                                            <div className="text-xl font-bold">+</div>
                                        </Link>
                                    </div>

                                    {navItems.slice(1).map((item, idx) => (
                                        <Link key={idx} to={item.path} className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-600 transition-colors">
                                            <item.icon size={24} />
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </div>
    );
}
