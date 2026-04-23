import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import ContactsPage from './pages/ContactsPage';
import PipelinesPage from './pages/PipelinesPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
        <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      {trend && (
        <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
          +{trend}%
        </span>
      )}
    </div>
    <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const DashboardHome = () => (
  <>
    <header className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bienvenido, Daniel</h1>
        <p className="text-muted-foreground italic">Aquí tienes el resumen de tu Agencia hoy.</p>
      </div>
      <div className="flex gap-4">
        <button className="bg-secondary px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80">
          Personalizar
        </button>
        <button className="bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
          Nueva Subcuenta
        </button>
      </div>
    </header>

    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <DashboardCard title="Total Leads" value="1,284" icon={Users} trend="12" />
      <DashboardCard title="Ventas del Mes" value="$45,200" icon={TrendingUp} trend="8" />
      <DashboardCard title="Oportunidades" value="48" icon={Target} />
      <DashboardCard title="Actividad" value="94%" icon={Activity} />
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 h-96 flex flex-col justify-center items-center text-muted-foreground italic">
        [ Espacio para Gráfica de Rendimiento ]
      </div>
      <div className="bg-card border border-border rounded-xl p-6 h-96">
        <h3 className="font-bold mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <p>Nuevo lead registrado en <span className="font-bold">Cliente Demo VIP</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-background">
                <Sidebar />
                <main className="flex-1 ml-64 p-8">
                  <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/pipelines" element={<PipelinesPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
