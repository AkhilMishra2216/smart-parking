import { useState, useEffect } from 'react';
import { X, Loader2, QrCode, Car, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scanQRCode } from '../utils/api';
export default function ScanPage() {
    const navigate = useNavigate();
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const location = useLocation();
    useEffect(() => {
        const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
        setVehicles(savedVehicles);
        if (location.state?.qrCode) {
            setScannedData(location.state.qrCode);
            if (location.state?.vehicle) {
            }
        }
    }, [location.state]);
    const handleScanComplete = (data) => {
        setScannedData(data);
    };
    const handleManualInput = () => {
        const qrCode = prompt('Enter QR Code (e.g., Inorbit Mall):', 'Inorbit Mall');
        if (qrCode) {
            handleScanComplete(qrCode);
        }
    };
    const handleVehicleSelect = (vehicle, code = scannedData) => {
        const activeCode = code || location.state?.qrCode;
        navigate('/confirm-parking', {
            state: {
                vehicle: vehicle,
                qrCode: activeCode
            }
        });
    };
    const handleRegisterNew = () => {
        navigate('/vehicle-select', { state: { qrCode: scannedData } });
    };
    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center relative overflow-hidden font-outfit">
            { }
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
            >
                <X size={24} />
            </button>
            { }
            <div className="flex-1 w-full flex flex-col items-center justify-center p-6 pb-40">
                <div className="w-72 h-72 relative animate-scale-in">
                    { }
                    <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-indigo-500 rounded-tl-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-indigo-500 rounded-tr-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-indigo-500 rounded-bl-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-indigo-500 rounded-br-3xl shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    { }
                    <div className="absolute left-4 right-4 h-0.5 bg-indigo-400 shadow-[0_0_20px_#818cf8] animate-scan z-20 top-1/2"></div>
                    { }
                    <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-3xl backdrop-blur-[2px]">
                        <QrCode size={64} className="text-slate-500/50" />
                    </div>
                </div>

                <div className="mt-8 text-center space-y-1">
                    {scannedData ? (
                        <>
                            <p className="text-lg font-medium text-slate-200">QR Code Detected!</p>
                            <p className="text-sm text-slate-500 font-medium">{scannedData}</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">Scanning...</h2>
                            <p className="text-sm text-slate-400">Align QR code within the frame</p>
                            <button
                                onClick={handleManualInput}
                                className="mt-4 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                SIMULATE SCAN
                            </button>
                        </>
                    )}
                </div>
                {error && (
                    <div className="mt-6 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-200">
                        {error}
                    </div>
                )}
            </div>
            { }
            {/* Vehicle Selection Sheet - Always Visible */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-[2rem] p-6 pb-8 animate-slide-up-sheet shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Select Your Vehicle</h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {scannedData
                            ? `Choose which vehicle you're parking at ${scannedData}`
                            : 'Select a vehicle or scan a QR code to park'
                        }
                    </p>
                </div>

                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {vehicles.map(v => (
                        <button
                            key={v.id}
                            onClick={() => {
                                if (scannedData) {
                                    handleVehicleSelect(v);
                                } else {
                                    // Optional: Select vehicle state or prompt
                                    alert('Please scan a QR code first');
                                }
                            }}
                            disabled={isScanning}
                            className={`w-full flex items-center justify-between p-4 bg-white border rounded-2xl transition-all group text-left ${scannedData
                                ? 'border-slate-200 hover:border-indigo-500 hover:bg-slate-50 cursor-pointer'
                                : 'border-slate-100 opacity-60 cursor-not-allowed'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                    <Car size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{v.name}</p>
                                    <p className="text-xs text-slate-500 font-medium">{v.plate}</p>
                                </div>
                            </div>
                            {isScanning ? (
                                <Loader2 size={18} className="animate-spin text-indigo-600" />
                            ) : (
                                <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600" />
                            )}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleRegisterNew}
                    className="w-full bg-[#4C35DE] text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_-10px_rgba(76,53,222,0.5)] hover:bg-indigo-700 active:scale-[0.98] transition-all"
                >
                    Register New Vehicle
                </button>
            </div>
            <style>{`
                @keyframes scan {
                    0% { top: 10%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 90%; opacity: 0; }
                }
                @keyframes slideInBottom {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-scan {
                    animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .animate-slide-up-sheet {
                    animation: slideInBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
}