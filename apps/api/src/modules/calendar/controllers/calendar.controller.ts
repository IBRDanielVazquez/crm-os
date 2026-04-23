import { Response } from 'express';
import { TenantRequest } from '../../../middlewares/tenant.middleware';
import { CalendarService } from '../services/calendar.service';

export class CalendarController {
  static async list(req: TenantRequest, res: Response) {
    try {
      const appointments = await CalendarService.getAppointments(req.subAccountId!);
      res.json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching appointments' });
    }
  }

  static async create(req: TenantRequest, res: Response) {
    try {
      const appointment = await CalendarService.createAppointment(req.subAccountId!, req.body);
      res.json({ success: true, data: appointment });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error creating appointment' });
    }
  }
}
