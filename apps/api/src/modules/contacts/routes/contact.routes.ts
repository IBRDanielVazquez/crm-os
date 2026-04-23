import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { tenantMiddleware } from '../../../middlewares/tenant.middleware';

const router = Router();

// Todas las rutas de contactos requieren el tenantMiddleware
router.use(tenantMiddleware);

router.get('/', ContactController.list);
router.post('/', ContactController.create);

export default router;
