import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-ibr';

export class AuthService {
  static async login(email: string, pass: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { subAccount: true }
    });

    if (!user) throw new Error('Usuario no encontrado');

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role, 
        subAccountId: user.subAccountId,
        orgId: user.subAccount?.organizationId 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        subAccountId: user.subAccountId
      }
    };
  }

  static async validateToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
