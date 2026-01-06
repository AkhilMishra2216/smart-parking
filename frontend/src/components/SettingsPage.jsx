import { User, Car, FileText, HelpCircle, ChevronRight, Edit2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 bg-[#F3F4F9] pb-32 h-full">
            <header className="bg-[#4C35DE] p-6 pb-24 text-white relative">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold">Settings</h1>
                </div>
                <p className="text-indigo-200 text-sm pl-11">Manage your account and preferences</p>
            </header>

            <div className="px-6 -mt-12 space-y-4 relative z-10">
                {/* Profile Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#4C35DE] rounded-full flex items-center justify-center text-white text-2xl font-medium">
                            J
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-800 text-lg">John Doe</h2>
                            <p className="text-gray-500 text-sm">+91 98765 43210</p>
                        </div>
                    </div>
                    <button className="p-2 text-[#4C35DE] hover:bg-indigo-50 rounded-full transition-colors">
                        <Edit2 size={18} />
                    </button>
                </div>

                {/* Menu Options */}
                <div className="space-y-3 pt-2">
                    {[
                        { icon: Car, label: 'Manage Vehicles', sub: '2 vehicles saved' },
                        { icon: FileText, label: 'Transaction History', sub: 'View all payments' },
                        { icon: HelpCircle, label: 'Help & Support', sub: 'Get assistance' },
                        { icon: HelpCircle, label: 'FAQ', sub: 'Frequently Asked Questions' }, // Using HelpCircle for FAQ as well
                    ].map((item, i) => (
                        <button key={i} className="w-full bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between group active:scale-[0.98] transition-transform">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-[#4C35DE] group-hover:text-white transition-colors">
                                    <item.icon size={22} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-800 text-sm">{item.label}</h3>
                                    <p className="text-xs text-gray-400">{item.sub}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-300" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}


