import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CalendarService {
  static async getAppointments(subAccountId: string) {
    return prisma.appointment.findMany({
      where: { subAccountId },
      orderBy: { startTime: 'asc' }
    });
  }

  static async createAppointment(subAccountId: string, data: { title: string; startTime: string; endTime: string; contactId?: string }) {
    return prisma.appointment.create({
      data: {
        ...data,
        subAccountId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime)
      }
    });
  }

  static async updateStatus(id: string, status: string) {
    return prisma.appointment.update({
      where: { id },
      data: { status }
    });
  }
}
