import React, { useEffect } from 'react';
import { useContactStore } from '../store/useContactStore';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

const ContactsPage = () => {
  const { contacts, loading, fetchContacts } = useContactStore();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contactos</h1>
          <p className="text-muted-foreground italic">Gestiona tus leads y clientes desde un solo lugar.</p>
        </div>
        <button className="bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nuevo Contacto
        </button>
      </header>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar contactos..." 
            className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="bg-secondary border border-border px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filtros
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Etiquetas</th>
              <th className="px-6 py-4 font-medium">Creado</th>
              <th className="px-6 py-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-4 h-16 bg-secondary/10" />
                </tr>
              ))
            ) : contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{contact.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{contact.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {contact.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">Reciente</td>
                  <td className="px-6 py-4">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground italic">
                  No se encontraron contactos. Comienza agregando uno nuevo.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;
