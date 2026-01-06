import { Home, ScanLine, User, Car, Shield, Crown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import LoginAsPanel from './LoginAsPanel';

export default function Layout({ children }) {
    const location = useLocation();
    const { role } = useRole();
    const isScanner = location.pathname === '/scan';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative">
            <div className="flex-1 w-full max-w-7xl mx-auto bg-gray-50 shadow-sm relative min-h-screen pb-32">
                {children}

                {/* Dynamic Bottom Navigation - Only for User (Scan Button) */}
                {!isScanner && role === 'user' && (
                    <nav className="fixed bottom-36 left-0 right-0 max-w-7xl mx-auto px-6 py-3 flex justify-between items-center z-40 bg-transparent pointer-events-none">
                        <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-full px-8 py-4 flex gap-8 mx-auto pointer-events-auto relative min-w-[100px] min-h-[60px]">
                            {/* Center Action Button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Link to="/scan" className="w-14 h-14 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-gray-50 hover:scale-105 transition-transform">
                                    <ScanLine size={24} />
                                </Link>
                            </div>
                        </div>
                    </nav>
                )}
            </div>

            {/* Persistent Role Switcher for Demo */}
            <LoginAsPanel />
        </div>
    );
}
