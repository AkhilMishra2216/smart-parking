import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scanQRCode } from '../utils/api';

export default function ScanPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicle = location.state?.vehicle;
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState(null);

    const handleScan = async (qrCode) => {
        if (!vehicle || !vehicle.id) {
            setError('Please select a vehicle first');
            return;
        }

        setIsScanning(true);
        setError(null);

        try {
            const result = await scanQRCode({
                qr_code: qrCode,
                vehicle_id: vehicle.id
            });

            if (result.type === 'entry') {
                // Navigate to ticket page with entry session
                const ticket = {
                    id: `TK-${Date.now()}`,
                    vehicle: vehicle,
                    entryTime: new Date().toISOString(),
                    session: result.session
                };
                sessionStorage.setItem('activeTicket', JSON.stringify(ticket));
                window.dispatchEvent(new Event('ticketUpdated'));
                navigate('/ticket');
            } else if (result.type === 'exit') {
                // Handle exit - show payment or confirmation
                navigate('/ticket', { state: { session: result.session, type: 'exit' } });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to scan QR code. Please try again.');
        } finally {
            setIsScanning(false);
        }
    };

    // For demo purposes - in production, use actual QR scanner
    const handleManualInput = () => {
        const qrCode = prompt('Enter QR Code:');
        if (qrCode) {
            handleScan(qrCode);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center relative">
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 right-6 z-20 p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
                <X size={24} />
            </button>

            <div className="mt-20 mb-8 text-center">
                <h1 className="text-xl font-medium mb-1">Scan QR Code</h1>
                <p className="text-sm text-gray-400">Scan the code at entry point</p>
                {vehicle && (
                    <p className="text-xs text-green-400 mt-2">Vehicle: {vehicle.plate}</p>
                )}
            </div>

            <div className="w-72 h-72 relative mt-4">
                <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-3xl"></div>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent animate-pulse rounded-3xl"></div>

                <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-3xl backdrop-blur-sm">
                    {isScanning ? (
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-2" />
                            <p className="text-xs">Processing...</p>
                        </div>
                    ) : (
                        <div className="text-center opacity-50">
                            <div className="text-6xl mb-2">📷</div>
                            <p className="text-xs">Camera View</p>
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-300">
                    {error}
                </div>
            )}

            <div className="mt-12 text-center px-10">
                <p className="text-sm text-gray-400 mb-4">
                    Position the QR Code within the frame. The scanner will automatically detect it.
                </p>
                <button
                    onClick={handleManualInput}
                    disabled={isScanning || !vehicle}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
                >
                    {!vehicle ? 'Select Vehicle First' : 'Enter QR Code Manually'}
                </button>
            </div>
        </div>
    );
}

