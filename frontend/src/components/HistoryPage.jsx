import { ArrowLeft, MapPin, Clock, Car, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
    const navigate = useNavigate();

    const historyData = [
        {
            mall: 'Phoenix Mall',
            location: 'Lower Parel, Mumbai',
            price: '₹180',
            date: '8 Dec 2025',
            vehicle: 'MH 12 AB 1234',
            status: 'completed'
        },
        {
            mall: 'Central Plaza',
            location: 'Andheri West, Mumbai',
            price: '₹120',
            date: '5 Dec 2025',
            vehicle: 'MH 14 CD 5678',
            status: 'completed'
        },
        {
            mall: 'City Center Mall',
            location: 'Bandra East, Mumbai',
            price: '₹200',
            date: '3 Dec 2025',
            vehicle: 'MH 12 AB 1234',
            status: 'completed'
        }
    ];

    return (
        <div className="flex-1 bg-[#F3F4F9] pb-32 font-sans h-full">
            <header className="bg-[#4C35DE] p-6 pb-24 text-white relative">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold">Parking History</h1>
                </div>
                <p className="text-indigo-200 text-sm pl-11">3 total bookings</p>
            </header>

            <div className="px-5 -mt-12 space-y-4 relative z-10">
                {historyData.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-gray-900 font-bold text-[15px]">{item.mall}</h3>
                                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                    <MapPin size={12} />
                                    <span>{item.location}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-gray-900 font-bold text-[15px]">{item.price}</span>
                                <span className="inline-block bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium mt-1">
                                    {item.status}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-gray-50 my-3"></div>

                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-gray-400" />
                                    <span className="text-xs font-medium text-gray-500">{item.date}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Car size={14} className="text-gray-400" />
                                    <span className="text-xs font-medium text-gray-500">{item.vehicle}</span>
                                </div>
                            </div>
                            <ChevronDown size={16} className="text-gray-300" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
