import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import contactRoutes from './modules/contacts/routes/contact.routes';
import pipelineRoutes from './modules/pipelines/routes/pipeline.routes';
import authRoutes from './modules/auth/routes/auth.routes';
import calendarRoutes from './modules/calendar/routes/calendar.routes';

dotenv.config({ path: '../../.env' });

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({ status: 'active', platform: 'CRM-OS', timestamp: new Date() });
});

// --- Rutas de Módulos ---
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/pipelines', pipelineRoutes);
app.use('/api/calendar', calendarRoutes);

app.listen(PORT, () => {
  console.log(`🚀 CRM-OS API corriendo en http://localhost:${PORT}`);
});
