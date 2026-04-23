import { create } from 'zustand';
import api from '../api/client';

interface Opportunity {
  id: string;
  name: string;
  value?: number;
  contact: { name: string };
}

interface Stage {
  id: string;
  name: string;
  opportunities: Opportunity[];
}

interface Pipeline {
  id: string;
  name: string;
  stages: Stage[];
}

interface PipelineState {
  pipelines: Pipeline[];
  loading: boolean;
  fetchPipelines: () => Promise<void>;
  moveOpportunity: (opportunityId: string, fromStageId: string, toStageId: string) => Promise<void>;
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  pipelines: [],
  loading: false,
  fetchPipelines: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/pipelines');
      set({ pipelines: response.data.data, loading: false });
    } catch (error) {
      console.error('Error fetching pipelines:', error);
      set({ loading: false });
    }
  },
  moveOpportunity: async (opportunityId, fromStageId, toStageId) => {
    const { pipelines } = get();
    // Optimistic update logic would go here
    try {
      await api.post('/pipelines/move', { opportunityId, stageId: toStageId });
      // Refresh to ensure consistency
      const response = await api.get('/pipelines');
      set({ pipelines: response.data.data });
    } catch (error) {
      console.error('Error moving opportunity:', error);
    }
  }
}));
