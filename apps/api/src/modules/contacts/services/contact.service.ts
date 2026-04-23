import { WorkflowService } from '../../automation/services/workflow.service';

const prisma = new PrismaClient();

export class ContactService {
  static async getAll(subAccountId: string) {
    return prisma.contact.findMany({
      where: { subAccountId },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async create(subAccountId: string, data: { name: string; email: string; phone?: string; tags?: string[] }) {
    const contact = await prisma.contact.create({
      data: {
        ...data,
        subAccountId
      }
    });

    // Trigger de Automatización
    WorkflowService.processEvent(subAccountId, 'CONTACT_CREATED', contact);

    return contact;
  }

  static async getById(id: string, subAccountId: string) {
    return prisma.contact.findFirst({
      where: { id, subAccountId }
    });
  }
}
