import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ScanPage() {
    const navigate = useNavigate();

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
            </div>

            <div className="w-72 h-72 relative mt-4">
                <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-blue-500 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-blue-500 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-blue-500 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-blue-500 rounded-br-3xl"></div>

                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent animate-pulse rounded-3xl"></div>

                <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-3xl backdrop-blur-sm">
                    <div className="text-center opacity-50">
                        <div className="text-6xl mb-2">📷</div>
                        <p className="text-xs">Camera View</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center px-10">
                <p className="text-sm text-gray-400">
                    Position the QR Code within the frame. The scanner will automatically detect it.
                </p>
            </div>
        </div>
    );
}
