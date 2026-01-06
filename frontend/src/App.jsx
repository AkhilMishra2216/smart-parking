import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ScanPage from './components/ScanPage';
import ManagerDashboard from './components/ManagerDashboard';
import DriverConsole from './components/DriverConsole';
import AdminDashboard from './components/AdminDashboard';
import VehicleSelection from './components/VehicleSelection';
import ConfirmParking from './components/ConfirmParking';
import TicketPage from './components/TicketPage';
import SettingsPage from './components/SettingsPage';
import HistoryPage from './components/HistoryPage';
import { RoleProvider, useRole } from './context/RoleContext';

function AppContent() {
  const { role } = useRole();

  const getHomeComponent = () => {
    switch (role) {
      case 'manager': return <ManagerDashboard />;
      case 'driver': return <DriverConsole />;
      case 'admin': return <AdminDashboard />;
      default: return <Dashboard />;
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={getHomeComponent()} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/vehicle-select" element={<VehicleSelection />} />
          <Route path="/confirm-parking" element={<ConfirmParking />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}

export default App;
