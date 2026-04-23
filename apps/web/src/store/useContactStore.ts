import { create } from 'zustand';
import api from '../api/client';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tags: string[];
}

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  fetchContacts: () => Promise<void>;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  loading: false,
  fetchContacts: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/contacts');
      set({ contacts: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching contacts:', error);
      set({ loading: false });
    }
  },
}));
