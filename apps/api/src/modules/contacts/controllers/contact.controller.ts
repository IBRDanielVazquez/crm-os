import { Response } from 'express';
import { TenantRequest } from '../../../middlewares/tenant.middleware';
import { ContactService } from '../services/contact.service';

export class ContactController {
  static async list(req: TenantRequest, res: Response) {
    try {
      const contacts = await ContactService.getAll(req.subAccountId!);
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching contacts' });
    }
  }

  static async create(req: TenantRequest, res: Response) {
    try {
      const contact = await ContactService.create(req.subAccountId!, req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
