import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Car, MapPin, Smartphone, CreditCard, Banknote, CheckCircle } from 'lucide-react';

export default function ConfirmParking() {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicle = location.state?.vehicle || { name: 'Toyota Camry', plate: 'MH 12 AB 1234' }; // Fallback

    return (
        <div className="min-h-screen bg-[#F3F4F9] pb-32">
            {/* Header */}
            <header className="bg-[#4C35DE] p-6 pb-24 text-white rounded-b-[2rem] shadow-lg relative">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold">Confirm Parking</h1>
                </div>
            </header>

            <div className="px-6 -mt-20 space-y-4">
                {/* Vehicle Details Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm font-medium">
                        <Car size={16} /> Vehicle Details
                    </div>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Owner</span>
                            <span className="font-bold text-gray-800">John Doe</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Vehicle</span>
                            <span className="font-bold text-gray-800">{vehicle.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Number Plate</span>
                            <span className="font-bold text-gray-800">{vehicle.plate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Mobile</span>
                            <span className="font-bold text-gray-800">+91 98765 43210</span>
                        </div>
                    </div>
                </div>

                {/* Location Card */}
                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-medium">
                        <MapPin size={16} /> Parking Location
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Inorbit Mall</h3>
                    <p className="text-sm text-gray-500">Malad West, Mumbai</p>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-3 ml-1">Payment Method</h3>
                    <p className="text-xs text-gray-500 mb-3 ml-1">Choose how you want to pay</p>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-indigo-50 border-2 border-indigo-500 p-4 rounded-xl flex flex-col items-center justify-center gap-2 relative">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <Smartphone size={20} />
                            </div>
                            <span className="text-sm font-bold text-gray-800">UPI</span>
                            <CheckCircle className="absolute bottom-2 right-2 text-indigo-500" size={16} />
                        </button>

                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                                <Banknote size={20} />
                            </div>
                            <span className="text-sm font-medium text-gray-600">Netbanking</span>
                        </button>
                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                                <CreditCard size={20} />
                            </div>
                            {/* <span className="text-sm font-medium text-gray-600">Card</span> */}
                        </button>
                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                                <Banknote size={20} />
                            </div>
                            {/* <span className="text-sm font-medium text-gray-600">Cash</span> */}
                        </button>
                    </div>
                </div>

                {/* Action Button */}
                <button
                    onClick={() => {
                        const ticket = {
                            id: 'TK-2026-01-06-439',
                            vehicle: vehicle,
                            entryTime: new Date().toISOString(),
                            amount: 150
                        };
                        sessionStorage.setItem('activeTicket', JSON.stringify(ticket));
                        window.dispatchEvent(new Event('ticketUpdated')); // Notify Layout
                        navigate('/ticket');
                    }}
                    className="w-full bg-[#4C35DE] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#3f2cb8] transition-colors mt-4"
                >
                    Park My Car
                </button>
            </div>
        </div>
    );
}
