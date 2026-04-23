import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Settings, Globe, Shield, CreditCard, LogOut } from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuthStore();

  const sections = [
    { 
      title: 'Perfil del Usuario', 
      icon: Settings, 
      desc: 'Gestiona tu información personal y preferencias de cuenta.',
      fields: [
        { label: 'Nombre Completo', value: user?.name },
        { label: 'Correo Electrónico', value: user?.email },
        { label: 'Rol del Sistema', value: user?.role },
      ]
    },
    { 
      title: 'Marca Blanca (Agency)', 
      icon: Globe, 
      desc: 'Configura tu dominio personalizado y marca para tus subcuentas.',
      fields: [
        { label: 'Dominio de Agencia', value: 'app.ibrvazquez.com' },
        { label: 'Nombre de Marca', value: 'IBR Agency' },
      ]
    },
    { 
      title: 'Seguridad', 
      icon: Shield, 
      desc: 'Aumenta la seguridad de tu cuenta activando 2FA.',
      button: 'Cambiar Contraseña'
    },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground italic">Personaliza tu experiencia y gestiona tu agencia.</p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors text-sm font-bold"
        >
          <LogOut className="w-4 h-4" /> Cerrar Sesión
        </button>
      </header>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border/50 flex items-start gap-4">
              <div className="p-3 bg-secondary rounded-xl">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.desc}</p>
              </div>
            </div>
            <div className="p-6 bg-secondary/10 space-y-4">
              {section.fields?.map((field, fidx) => (
                <div key={fidx} className="flex justify-between items-center border-b border-border/30 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-muted-foreground">{field.label}</span>
                  <span className="text-sm font-bold">{field.value}</span>
                </div>
              ))}
              {section.button && (
                <button className="bg-secondary px-4 py-2 rounded-lg text-sm font-bold hover:bg-secondary/80">
                  {section.button}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl flex justify-between items-center">
        <div>
          <h4 className="font-bold text-primary mb-1">Plan de Suscripción: Agency Unlimited</h4>
          <p className="text-xs text-muted-foreground italic">Tu próxima factura es por $297 USD el 15 de Mayo, 2026.</p>
        </div>
        <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
          Gestionar Facturación
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
