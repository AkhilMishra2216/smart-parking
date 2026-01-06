import { useNavigate } from 'react-router-dom';
import { Car, ChevronRight, Plus } from 'lucide-react';

export default function VehicleSelection() {
    const navigate = useNavigate();

    const vehicles = [
        { id: 1, name: 'Toyota Camry', plate: 'MH 12 AB 1234' },
        { id: 2, name: 'Honda Civic', plate: 'MH 14 CD 5678' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="pt-8 pb-4 px-6 text-center border-b border-gray-100 flex items-center justify-center relative">
                <div className="w-10 h-1 bg-gray-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2"></div>
                <h2 className="text-lg font-bold">Select Your Vehicle</h2>
            </div>

            <div className="p-6">
                <p className="text-gray-500 text-sm mb-4">Choose which vehicle you're parking at Inorbit Mall</p>

                <div className="space-y-4">
                    {vehicles.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => navigate('/confirm-parking', { state: { vehicle: v } })}
                            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-sm transition-all bg-white"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                    <Car size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-gray-800">{v.name}</h3>
                                    <p className="text-xs text-gray-500">{v.plate}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    ))}
                </div>

                <button className="w-full mt-6 bg-[#4C35DE] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#3f2cb8] transition-colors flex items-center justify-center gap-2">
                    Register New Vehicle
                </button>
            </div>
        </div>
    );
}
