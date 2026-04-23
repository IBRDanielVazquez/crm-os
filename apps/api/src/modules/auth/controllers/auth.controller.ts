import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  static async me(req: any, res: Response) {
    res.json({ success: true, user: req.user });
  }
}
