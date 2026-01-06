import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ChevronRight, Plus, Loader2, X } from 'lucide-react';
import { registerVehicle } from '../utils/api';

export default function VehicleSelection() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formData, setFormData] = useState({
        owner_name: '',
        license_plate: '',
        contact: ''
    });
    const [error, setError] = useState(null);

    // Load vehicles from localStorage (in production, fetch from API)
    useEffect(() => {
        const savedVehicles = localStorage.getItem('vehicles');
        if (savedVehicles) {
            setVehicles(JSON.parse(savedVehicles));
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await registerVehicle(formData);
            const newVehicle = {
                id: result.vehicle.id,
                name: formData.owner_name + "'s Vehicle",
                plate: formData.license_plate
            };
            
            const updatedVehicles = [...vehicles, newVehicle];
            setVehicles(updatedVehicles);
            localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
            
            setShowRegisterForm(false);
            setFormData({ owner_name: '', license_plate: '', contact: '' });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register vehicle. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

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

                <button 
                    onClick={() => setShowRegisterForm(true)}
                    className="w-full mt-6 bg-[#4C35DE] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#3f2cb8] transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={20} />
                    Register New Vehicle
                </button>
            </div>

            {showRegisterForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold">Register New Vehicle</h3>
                            <button
                                onClick={() => {
                                    setShowRegisterForm(false);
                                    setError(null);
                                    setFormData({ owner_name: '', license_plate: '', contact: '' });
                                }}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Owner Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.owner_name}
                                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C35DE] focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    License Plate
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.license_plate}
                                    onChange={(e) => setFormData({ ...formData, license_plate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C35DE] focus:border-transparent"
                                    placeholder="MH 12 AB 1234"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C35DE] focus:border-transparent"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#4C35DE] text-white py-3 rounded-xl font-bold shadow-lg hover:bg-[#3f2cb8] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Registering...
                                    </>
                                ) : (
                                    'Register Vehicle'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
