import { Router } from 'express';
import { PipelineController } from '../controllers/pipeline.controller';
import { tenantMiddleware } from '../../../middlewares/tenant.middleware';

const router = Router();

router.use(tenantMiddleware);

router.get('/', PipelineController.list);
router.post('/move', PipelineController.moveOpportunity);

export default router;
