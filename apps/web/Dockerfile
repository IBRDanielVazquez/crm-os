# Dockerfile para CRM-OS Web (Producción)
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
COPY turbo.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm install

COPY . .

# Variables de entorno para el build
ENV VITE_API_URL=/api

RUN npm run build --filter=web

# Stage de Nginx para servir estáticos
FROM nginx:alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
