import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCalendarStore } from '../store/useCalendarStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, Plus, Video, MapPin } from 'lucide-react';
import './Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const { appointments, loading, fetchAppointments } = useCalendarStore();

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const selectedDateAppointments = appointments.filter(app => 
    format(new Date(app.startTime), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  return (
    <div className="space-y-8 h-full">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground italic">Gestiona tus reuniones y disponibilidad.</p>
        </div>
        <button className="bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nueva Cita
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-card border border-border p-6 rounded-2xl shadow-sm h-fit">
          <Calendar 
            onChange={(val: any) => setDate(val)} 
            value={date}
            className="w-full border-none bg-transparent text-foreground"
            locale="es-ES"
          />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">
              {format(date, "EEEE, d 'de' MMMM", { locale: es })}
            </h3>
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
              {selectedDateAppointments.length} Eventos
            </span>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2 scrollbar-hide">
            {loading ? (
              <p className="text-center text-muted-foreground animate-pulse">Sincronizando agenda...</p>
            ) : selectedDateAppointments.length > 0 ? (
              selectedDateAppointments.map((app) => (
                <div key={app.id} className="bg-card border border-border p-5 rounded-xl hover:border-primary/50 transition-all group flex gap-6">
                  <div className="flex flex-col items-center justify-center border-r border-border pr-6 min-w-[100px]">
                    <span className="text-sm font-bold text-primary">
                      {format(new Date(app.startTime), 'HH:mm')}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {format(new Date(app.endTime), 'HH:mm')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{app.title}</h4>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 45 min
                      </div>
                      <div className="flex items-center gap-1">
                        <Video className="w-3 h-3" /> Zoom
                      </div>
                    </div>
                  </div>
                  <button className="bg-secondary p-2 rounded-lg self-center text-muted-foreground hover:text-foreground">
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              ))
            ) : (
              <div className="h-64 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground italic gap-2">
                <Calendar className="w-8 h-8 opacity-20" />
                <p>No hay citas programadas para este día.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
