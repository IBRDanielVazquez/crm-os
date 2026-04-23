import { Router } from 'express';
import { CalendarController } from '../controllers/calendar.controller';
import { tenantMiddleware } from '../../../middlewares/tenant.middleware';

const router = Router();

router.use(tenantMiddleware);

router.get('/', CalendarController.list);
router.post('/', CalendarController.create);

export default router;
