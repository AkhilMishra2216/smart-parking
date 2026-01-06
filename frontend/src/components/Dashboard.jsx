import { useNavigate } from 'react-router-dom';
import ProfileRoleSwitcher from './ProfileRoleSwitcher';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 pb-12 rounded-b-[2.5rem] shadow-lg">
        <div className="flex justify-between items-center text-white">
          <div>
            <p className="text-blue-100 text-sm font-medium">Smart Parking</p>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
          </div>
          <ProfileRoleSwitcher light={true} />
        </div>
      </header>

      <main className="px-6 mt-6 space-y-6">
        {/* Promo Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-5 text-white shadow-xl flex items-center justify-between overflow-hidden relative">
          <div className="z-10">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-300">🏆</span>
              <span className="text-xs font-bold tracking-wider text-blue-100">#1 IN INDIA</span>
            </div>
            <h2 className="text-lg font-bold leading-tight mb-1">Premium Parking Solution</h2>
            <p className="text-blue-100 text-xs">Trusted by 1M+ users nationwide</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/10 to-transparent"></div>
          <div className="text-4xl z-10">🚗</div>
        </div>

        {/* Scan Action */}
        <button onClick={() => navigate('/vehicle-select')} className="w-full group transform transition-all active:scale-95">
          <div className="bg-gradient-to-r from-amber-200 to-orange-100 p-1 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 flex items-center justify-between border border-orange-100/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg text-2xl">
                  📷
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-800">Scan to Park</h3>
                  <p className="text-xs text-gray-500">Scan QR code at parking entrance</p>
                </div>
              </div>
              <div className="text-gray-400">›</div>
            </div>
          </div>
        </button>

        {/* Recent Parking */}
        <div>
          <h3 className="text-gray-800 font-bold mb-3">Recent Parking</h3>
          <div className="space-y-3">
            {[
              { place: "Phoenix Mall", loc: "Lower Parel, Mumbai", price: "₹180", date: "8 Dec 2025", plate: "MH 12 AB 1234", time: "4h 15m" },
              { place: "Central Plaza", loc: "Andheri West, Mumbai", price: "₹120", date: "5 Dec 2025", plate: "MH 14 CD 5678", time: "2h 50m" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-800">{item.place}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">📍 {item.loc}</p>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-gray-800">{item.price}</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">completed</span>
                  </div>
                </div>
                <div className="border-t border-gray-50 pt-2 flex justify-between text-xs text-gray-400">
                  <div className="flex gap-3">
                    <span>🕒 {item.date}</span>
                    <span>🚗 {item.plate}</span>
                  </div>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
