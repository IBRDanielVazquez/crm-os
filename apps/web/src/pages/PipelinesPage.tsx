import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { usePipelineStore } from '../store/usePipelineStore';
import { Plus, MoreVertical, DollarSign, User } from 'lucide-react';

const PipelinesPage = () => {
  const { pipelines, loading, fetchPipelines, moveOpportunity } = usePipelineStore();

  useEffect(() => {
    fetchPipelines();
  }, [fetchPipelines]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    moveOpportunity(draggableId, source.droppableId, destination.droppableId);
  };

  const currentPipeline = pipelines[0]; // Simplificado para el MVP

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pipelines</h1>
          <p className="text-muted-foreground italic">Visualiza y mueve tus negocios a través de las etapas.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-secondary border border-border rounded-lg px-4 py-2 text-sm focus:outline-none">
            <option>Ventas Terrenos 2026</option>
          </select>
          <button className="bg-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nueva Oportunidad
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground italic">
          Cargando Tablero Kanban...
        </div>
      ) : currentPipeline ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {currentPipeline.stages.map((stage) => (
              <div key={stage.id} className="w-80 shrink-0 flex flex-col bg-secondary/20 rounded-xl border border-border/50">
                <div className="p-4 flex justify-between items-center border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm uppercase tracking-wider">{stage.name}</span>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                      {stage.opportunities.length}
                    </span>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <Droppable droppableId={stage.id}>
                  {(provided) => (
                    <div 
                      {...provided.droppableId} 
                      ref={provided.innerRef} 
                      className="flex-1 p-3 space-y-3 overflow-y-auto"
                    >
                      {stage.opportunities.map((opp, index) => (
                        <Draggable key={opp.id} draggableId={opp.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-card border border-border p-4 rounded-lg shadow-sm hover:border-primary/50 transition-all group"
                            >
                              <h4 className="font-bold text-sm mb-3 group-hover:text-primary transition-colors">
                                {opp.name}
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <User className="w-3 h-3" />
                                  {opp.contact.name}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                                  <DollarSign className="w-3 h-3" />
                                  {opp.value ? opp.value.toLocaleString() : '0'}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground italic border-2 border-dashed border-border rounded-xl">
          No hay etapas definidas para este pipeline.
        </div>
      )}
    </div>
  );
};

export default PipelinesPage;
