import { WorkflowService } from '../../automation/services/workflow.service';

const prisma = new PrismaClient();

export class PipelineService {
  static async getBySubAccount(subAccountId: string) {
    return prisma.pipeline.findMany({
      where: { subAccountId },
      include: {
        stages: {
          orderBy: { order: 'asc' },
          include: {
            opportunities: {
              include: { contact: true }
            }
          }
        }
      }
    });
  }

  static async createOpportunity(subAccountId: string, data: { name: string; contactId: string; stageId: string; value?: number }) {
    return prisma.opportunity.create({
      data: {
        ...data,
      }
    });
  }

  static async updateOpportunityStage(id: string, stageId: string) {
    const opportunity = await prisma.opportunity.update({
      where: { id },
      data: { stageId },
      include: { 
        stage: { include: { pipeline: true } },
        contact: true
      }
    });

    // Trigger de Automatización
    WorkflowService.processEvent(
      opportunity.stage.pipeline.subAccountId, 
      'OPPORTUNITY_STAGE_CHANGED', 
      opportunity
    );

    return opportunity;
  }
}
