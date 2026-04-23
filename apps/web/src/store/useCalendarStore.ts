import { create } from 'zustand';
import api from '../api/client';

interface Appointment {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface CalendarState {
  appointments: Appointment[];
  loading: boolean;
  fetchAppointments: () => Promise<void>;
  addAppointment: (data: any) => Promise<void>;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  appointments: [],
  loading: false,
  fetchAppointments: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/calendar');
      set({ appointments: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      set({ loading: false });
    }
  },
  addAppointment: async (data) => {
    try {
      await api.post('/calendar', data);
      const response = await api.get('/calendar');
      set({ appointments: response.data.data });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  }
}));
