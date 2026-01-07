import { useNavigate } from 'react-router-dom';
import { ScanLine, MapPin, Clock, Calendar, Car } from 'lucide-react';
import ProfileRoleSwitcher from './ProfileRoleSwitcher';
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-b-[2.5rem] shadow-xl shadow-indigo-200 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl" />
      </div>
      <header className="relative p-6 pt-8 pb-4 text-white z-20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Smart Parking</p>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          </div>
          <ProfileRoleSwitcher light={true} />
        </div>
      </header>
      <main className="px-6 mt-2 space-y-6 relative z-10">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[1.5rem] p-6 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden animate-fade-in group hover:scale-[1.02] transition-transform">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-300 animate-pulse">🏆</span>
              <span className="text-xs font-bold tracking-widest text-indigo-100">#1 IN INDIA</span>
            </div>
            <h2 className="text-xl font-bold leading-tight mb-2">Premium Parking<br />Solution</h2>
            <p className="text-indigo-100 text-xs font-medium bg-white/10 inline-block px-3 py-1 rounded-full backdrop-blur-sm">Trusted by 1M+ users</p>
          </div>
          <div className="absolute -right-4 -bottom-4 text-8xl opacity-20 transform rotate-12 group-hover:rotate-6 transition-transform duration-500">
            🚗
          </div>
        </div>
        <button
          onClick={() => navigate('/scan')}
          className="w-full group transform transition-all active:scale-95 animate-slide-up"
        >
          <div className="bg-gradient-to-r from-amber-100 to-orange-50 p-1.5 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:shadow-orange-500/10 transition-all">
            <div className="bg-white/80 backdrop-blur-sm rounded-[1.2rem] p-5 flex items-center justify-between border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30 text-2xl group-hover:scale-110 transition-transform">
                  <ScanLine size={28} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-slate-800">Scan to Park</h3>
                  <p className="text-xs text-slate-500 font-medium">Scan QR code at entrance</p>
                </div>
              </div>
              <div className="text-slate-300 font-light text-2xl group-hover:translate-x-1 transition-transform">›</div>
            </div>
          </div>
        </button>
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-slate-800 font-bold text-lg">Recent Parking</h3>
            <button className="text-xs text-indigo-600 font-bold hover:text-indigo-700">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { place: "Phoenix Mall", loc: "Lower Parel, Mumbai", price: "₹180", date: "8 Dec", plate: "MH 12 AB 1234", time: "4h 15m" },
              { place: "Central Plaza", loc: "Andheri West, Mumbai", price: "₹120", date: "5 Dec", plate: "MH 14 CD 5678", time: "2h 50m" }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 hover:bg-white transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-3">
                    <div className="mt-1 bg-indigo-50 p-2 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{item.place}</h4>
                      <p className="text-xs text-slate-500 font-medium">{item.loc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-slate-800 text-lg">{item.price}</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">paid</span>
                  </div>
                </div>
                <div className="border-t border-dashed border-slate-100 pt-3 flex justify-between text-xs text-slate-400 font-medium">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                    <span className="flex items-center gap-1"><Car size={12} /> {item.plate}</span>
                  </div>
                  <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}