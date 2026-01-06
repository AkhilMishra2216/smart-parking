import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Car, ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDashboardData } from '../utils/api';

export default function HistoryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicle = location.state?.vehicle;
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHistory = async () => {
            // Get vehicle ID from localStorage or props
            const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
            const vehicleId = vehicle?.id || (savedVehicles.length > 0 ? savedVehicles[0].id : null);

            if (!vehicleId) {
                setError('No vehicle found. Please register a vehicle first.');
                setIsLoading(false);
                return;
            }

            try {
                const result = await getDashboardData(vehicleId);
                // Transform API response to match component format
                const transformedHistory = result.history.map((session) => ({
                    mall: 'Parking Spot',
                    location: session.spot_id || 'Unknown Location',
                    price: session.amount ? `₹${session.amount}` : '₹0',
                    date: new Date(session.entry_time).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    }),
                    vehicle: vehicle?.plate || 'N/A',
                    status: session.status || 'completed',
                    session: session
                }));
                setHistoryData(transformedHistory);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load history. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        loadHistory();
    }, [vehicle]);

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
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin text-[#4C35DE]" size={32} />
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
                        {error}
                    </div>
                ) : historyData.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <p className="text-gray-500">No parking history found.</p>
                    </div>
                ) : (
                    historyData.map((item, index) => (
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
                    ))
                )}
            </div>
        </div>
    );
}
