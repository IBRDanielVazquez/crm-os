import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class OrgService {
  static async getOrg(id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: { subAccounts: true }
    });
  }

  static async updateOrg(id: string, data: { name: string; logoUrl?: string; domain?: string }) {
    return prisma.organization.update({
      where: { id },
      data
    });
  }

  static async getSubAccount(id: string) {
    return prisma.subAccount.findUnique({
      where: { id }
    });
  }
}
