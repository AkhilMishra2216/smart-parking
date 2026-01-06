import { Share2, Download, Car, MapPin, Clock, CreditCard, Ticket as TicketIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TicketPage() {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const savedTicket = sessionStorage.getItem('activeTicket');
        if (savedTicket) {
            setTicket(JSON.parse(savedTicket));
        }
    }, []);

    if (!ticket) {
        return (
            <div className="min-h-screen bg-[#F3F4F9] pb-32 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <TicketIcon className="text-gray-400" size={40} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">No Active Ticket</h2>
                <p className="text-gray-500 mb-8">Scan a QR code at a parking entrance to generate a digital ticket.</p>
                <Link to="/" className="bg-[#4C35DE] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3f2cb8] transition-colors">
                    Go to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F3F4F9] pb-32 flex flex-col items-center pt-8 px-6">
            <h1 className="text-center text-gray-500 text-xs uppercase tracking-wider mb-1">Smart Parking System</h1>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Digital Parking Ticket</h2>
            <p className="text-[#4C35DE] font-medium text-sm mb-6">Inorbit Mall</p>

            <div className="bg-white w-full max-w-sm rounded-3xl shadow-sm p-6 relative">
                <div className="absolute top-48 -left-4 w-8 h-8 bg-[#F3F4F9] rounded-full"></div>
                <div className="absolute top-48 -right-4 w-8 h-8 bg-[#F3F4F9] rounded-full"></div>

                <div className="flex justify-center mb-8">
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl">
                        <QRCodeSVG value={ticket.id} size={160} />
                    </div>
                </div>

                <div className="space-y-6 pt-4">
                    <div className="flex items-start gap-4">
                        <span className="text-gray-300 text-xl font-bold">#</span>
                        <div>
                            <p className="text-xs text-gray-400">Ticket ID</p>
                            <p className="font-bold text-gray-800">{ticket.id}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Car className="text-gray-300" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">Vehicle</p>
                            <p className="font-bold text-gray-800">{ticket.vehicle.name}</p>
                            <p className="text-xs text-gray-500">{ticket.vehicle.plate}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <MapPin className="text-gray-300" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="font-bold text-gray-800">Inorbit Mall, Mumbai</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Clock className="text-gray-300" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">Entry Time</p>
                            <p className="font-bold text-gray-800">{new Date(ticket.entryTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                            <p className="text-xs text-green-600 font-medium">Active Now</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 border-t border-dashed border-gray-100 pt-4">
                        <CreditCard className="text-gray-300" size={20} />
                        <div>
                            <p className="text-xs text-gray-400">Amount Paid</p>
                            <p className="text-xl font-bold text-gray-800">₹{ticket.amount}</p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-[10px] text-gray-300 mt-8">Powered by Smart Parking</p>
            </div>

            <div className="w-full max-w-sm space-y-3 mt-6">
                <button className="w-full bg-[#4C35DE] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-[#3f2cb8] transition-colors flex items-center justify-center gap-2">
                    <Car size={18} /> Get My Car
                </button>

                <button className="w-full bg-white text-gray-700 py-3.5 rounded-xl font-bold shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Download size={18} /> Download Ticket
                </button>

                <button className="w-full bg-white text-gray-700 py-3.5 rounded-xl font-bold shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={18} /> Share Ticket
                </button>
            </div>
        </div>
    );
}
