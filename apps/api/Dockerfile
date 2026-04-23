# Dockerfile para CRM-OS API
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de configuración del monorepo
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/database/package*.json ./packages/database/
COPY packages/database/schema.prisma ./packages/database/

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate --schema=./packages/database/schema.prisma

# Compilar el proyecto
RUN npm run build --filter=api

EXPOSE 3001

CMD ["npm", "run", "start", "--filter=api"]
