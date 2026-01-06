import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; // User Dashboard
import ScanPage from './components/ScanPage';
import ManagerDashboard from './components/ManagerDashboard';
import DriverConsole from './components/DriverConsole';
import AdminDashboard from './components/AdminDashboard';
import { RoleProvider, useRole } from './context/RoleContext';

function AppContent() {
  const { role } = useRole();

  // Dynamic Home Component based on Role
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
