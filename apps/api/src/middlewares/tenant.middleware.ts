import { Request, Response, NextFunction } from 'express';

export interface TenantRequest extends Request {
  subAccountId?: string;
}

export const tenantMiddleware = (req: TenantRequest, res: Response, next: NextFunction) => {
  const subAccountId = req.header('x-subaccount-id');

  if (!subAccountId) {
    return res.status(400).json({
      success: false,
      message: 'x-subaccount-id header is required for this operation.'
    });
  }

  req.subAccountId = subAccountId;
  next();
};
