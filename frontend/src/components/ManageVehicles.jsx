import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Edit2, Trash2, Plus, Loader2, X } from 'lucide-react';
import { registerVehicle } from '../utils/api';

export default function ManageVehicles() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        owner_name: '',
        license_plate: '',
        contact: ''
    });

    useEffect(() => {
        const savedVehicles = localStorage.getItem('vehicles');
        if (savedVehicles) {
            setVehicles(JSON.parse(savedVehicles));
        }
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // If editing, updates local only for now as backend update isn't fully spec'd for simple demo
            // If adding, checks duplicates locally or registers via API

            if (editingId) {
                // Update existing
                const updatedVehicles = vehicles.map(v =>
                    v.id === editingId ? { ...v, name: formData.owner_name + "'s Vehicle", plate: formData.license_plate, owner: formData.owner_name } : v
                );
                setVehicles(updatedVehicles);
                localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
                handleCloseModal();
            } else {
                // Add new
                const result = await registerVehicle(formData);
                const newVehicle = {
                    id: result.vehicle.id,
                    name: formData.owner_name + "'s Vehicle",
                    plate: formData.license_plate,
                    owner: formData.owner_name
                };

                const updatedVehicles = [...vehicles, newVehicle];
                setVehicles(updatedVehicles);
                localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
                handleCloseModal();
            }
        } catch (err) {
            console.error(err);
            // Fallback for demo: if API fails (e.g. duplicate), still show error
            // For pure local demo without backend running perfectly:
            if (err.response?.status !== 409) {
                // Creating mock if API fails for demo purposes
                const newVehicle = {
                    id: `local-${Date.now()}`,
                    name: formData.owner_name + "'s Vehicle",
                    plate: formData.license_plate,
                    owner: formData.owner_name
                };
                const updatedVehicles = editingId
                    ? vehicles.map(v => v.id === editingId ? newVehicle : v)
                    : [...vehicles, newVehicle];

                setVehicles(updatedVehicles);
                localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
                handleCloseModal();
                return;
            }
            setError(err.response?.data?.error || 'Failed to save vehicle.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = (id) => {
        if (window.confirm('Are you sure you want to remove this vehicle?')) {
            const updatedVehicles = vehicles.filter(v => v.id !== id);
            setVehicles(updatedVehicles);
            localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
        }
    };

    const handleEdit = (vehicle) => {
        setEditingId(vehicle.id);
        setFormData({
            owner_name: vehicle.owner || 'John Doe', // Fallback if owner not saved previously
            license_plate: vehicle.plate,
            contact: ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ owner_name: '', license_plate: '', contact: '' });
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-outfit">
            {/* Header */}
            <header className="bg-[#4C35DE] text-white p-6 pb-12 shadow-md sticky top-0 z-10">
                <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Manage Vehicles</h1>
                </div>
                <p className="text-indigo-200 text-sm pl-12">{vehicles.length} vehicles registered</p>
            </header>

            {/* Content */}
            <div className="flex-1 px-6 -mt-6 pb-24 space-y-4">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                        {/* Vehicle Info */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-[#4C35DE]">
                                <Car size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{vehicle.name || "Vehicle"}</h3>
                                <p className="text-gray-500 font-medium mb-1">{vehicle.plate}</p>
                                <p className="text-gray-400 text-sm">{vehicle.owner || "John Doe"}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleEdit(vehicle)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100/80 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleRemove(vehicle.id)}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl transition-colors"
                            >
                                <Trash2 size={16} />
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add New Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-[#4C35DE] text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                >
                    <Plus size={20} />
                    Add New Vehicle
                </button>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative animate-scale-in">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Owner Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.owner_name}
                                    onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4C35DE] focus:border-[#4C35DE] outline-none transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    License Plate
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.license_plate}
                                    onChange={(e) => setFormData({ ...formData, license_plate: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4C35DE] focus:border-[#4C35DE] outline-none transition-all font-medium"
                                    placeholder="MH 12 AB 1234"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#4C35DE] text-white py-4 rounded-xl font-bold hover:bg-[#3f2cb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Vehicle'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
