import { Response } from 'express';
import { TenantRequest } from '../../../middlewares/tenant.middleware';
import { PipelineService } from '../services/pipeline.service';

export class PipelineController {
  static async list(req: TenantRequest, res: Response) {
    try {
      const pipelines = await PipelineService.getBySubAccount(req.subAccountId!);
      res.json({ success: true, data: pipelines });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching pipelines' });
    }
  }

  static async moveOpportunity(req: TenantRequest, res: Response) {
    try {
      const { opportunityId, stageId } = req.body;
      const opportunity = await PipelineService.updateOpportunityStage(opportunityId, stageId);
      res.json({ success: true, data: opportunity });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error moving opportunity' });
    }
  }
}
