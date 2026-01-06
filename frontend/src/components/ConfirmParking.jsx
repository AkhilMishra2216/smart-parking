import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Car, MapPin, Smartphone, CreditCard, Banknote, CheckCircle, Loader2 } from 'lucide-react';
import { scanQRCode } from '../utils/api';

export default function ConfirmParking() {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicle = location.state?.vehicle || { name: 'Toyota Camry', plate: 'MH 12 AB 1234' };
    const qrCode = location.state?.qrCode || 'SPOT-001';
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className="min-h-screen bg-[#F3F4F9] pb-32">
            <header className="bg-[#4C35DE] p-6 pb-24 text-white rounded-b-[2rem] shadow-lg relative">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold">Confirm Parking</h1>
                </div>
            </header>

            <div className="px-6 -mt-20 space-y-4">
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

                <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-medium">
                        <MapPin size={16} /> Parking Location
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Inorbit Mall</h3>
                    <p className="text-sm text-gray-500">Malad West, Mumbai</p>
                </div>

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
                        </button>
                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2">
                            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                                <Banknote size={20} />
                            </div>
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                        {error}
                    </div>
                )}

                <button
                    onClick={async () => {
                        if (!vehicle || !vehicle.id) {
                            setError('Vehicle information is missing');
                            return;
                        }

                        setIsProcessing(true);
                        setError(null);

                        try {
                            const result = await scanQRCode({
                                qr_code: qrCode,
                                vehicle_id: vehicle.id
                            });

                            if (result.type === 'entry') {
                                const ticket = {
                                    id: `TK-${Date.now()}`,
                                    vehicle: vehicle,
                                    entryTime: new Date().toISOString(),
                                    session: result.session,
                                    amount: 0
                                };
                                sessionStorage.setItem('activeTicket', JSON.stringify(ticket));
                                window.dispatchEvent(new Event('ticketUpdated'));
                                navigate('/ticket');
                            } else if (result.type === 'exit') {
                                // Handle exit case
                                navigate('/ticket', { state: { session: result.session, type: 'exit' } });
                            }
                        } catch (err) {
                            setError(err.response?.data?.error || 'Failed to confirm parking. Please try again.');
                        } finally {
                            setIsProcessing(false);
                        }
                    }}
                    disabled={isProcessing}
                    className="w-full bg-[#4C35DE] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#3f2cb8] transition-colors mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        'Park My Car'
                    )}
                </button>
            </div>
        </div>
    );
}
