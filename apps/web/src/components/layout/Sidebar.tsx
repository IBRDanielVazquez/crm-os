import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  Settings, 
  Calendar, 
  MessageSquare, 
  Kanban,
  Zap
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Contactos', path: '/contacts' },
    { icon: Kanban, label: 'Pipelines', path: '/pipelines' },
    { icon: MessageSquare, label: 'Conversaciones', path: '/conversations' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: Zap, label: 'Automatización', path: '/automation' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-card border-r border-border flex flex-col p-4 fixed left-0 top-0">
      <Link to="/" className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Zap className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight">CRM-OS</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-secondary text-primary' 
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border pt-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
            DV
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Daniel Vazquez</span>
            <span className="text-xs text-muted-foreground italic">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
