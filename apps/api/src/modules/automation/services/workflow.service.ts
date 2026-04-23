import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class WorkflowService {
  static async processEvent(subAccountId: string, eventType: string, payload: any) {
    console.log(`[WorkflowEngine] Procesando evento: ${eventType} para subcuenta: ${subAccountId}`);

    // 1. Buscar Workflows activos con este trigger
    const workflows = await prisma.workflow.findMany({
      where: {
        subAccountId,
        active: true,
        triggers: {
          some: { type: eventType }
        }
      },
      include: {
        actions: { orderBy: { order: 'asc' } }
      }
    });

    for (const workflow of workflows) {
      console.log(`[WorkflowEngine] Ejecutando Workflow: ${workflow.name}`);
      await this.executeWorkflow(workflow, payload);
    }
  }

  private static async executeWorkflow(workflow: any, payload: any) {
    // 2. Crear registro de ejecución
    const execution = await prisma.workflowExecution.create({
      data: {
        workflowId: workflow.id,
        contactId: payload.contactId || 'unknown',
        status: 'RUNNING'
      }
    });

    // 3. Ejecutar acciones en secuencia
    for (const action of workflow.actions) {
      try {
        await this.runAction(action, payload);
      } catch (error) {
        console.error(`[WorkflowEngine] Error en acción ${action.type}:`, error);
        await prisma.workflowExecution.update({
          where: { id: execution.id },
          data: { status: 'FAILED' }
        });
        return;
      }
    }

    // 4. Marcar como completado
    await prisma.workflowExecution.update({
      where: { id: execution.id },
      data: { status: 'COMPLETED' }
    });
  }

  private static async runAction(action: any, payload: any) {
    console.log(`[WorkflowEngine] Ejecutando acción: ${action.type}`);
    
    switch (action.type) {
      case 'SEND_EMAIL':
        console.log(`[MOCK] Enviando email: ${action.config.subject} a ${payload.email}`);
        break;
      case 'ADD_TAG':
        console.log(`[MOCK] Agregando etiqueta: ${action.config.tag} a contacto ${payload.contactId}`);
        break;
      default:
        console.log(`[WorkflowEngine] Acción no soportada: ${action.type}`);
    }
    
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
