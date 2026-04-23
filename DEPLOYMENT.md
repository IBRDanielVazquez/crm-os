# 🚀 Guía de Despliegue CRM-OS en Hostinger (VPS)

Este sistema está diseñado para correr en un **VPS con Docker**. Sigue estos pasos para ponerlo online:

## 1. Requisitos Previos en Hostinger
*   Asegúrate de tener un VPS con **Ubuntu 22.04** o similar.
*   Instala Docker y Docker Compose:
    ```bash
    sudo apt update
    sudo apt install docker.io docker-compose -y
    ```

## 2. Preparar el Código
*   Clona el repositorio en tu servidor:
    ```bash
    git clone https://github.com/IBRDanielVazquez/crm-os.git
    cd crm-os
    ```
*   Crea tu archivo `.env` basándote en el ejemplo:
    ```bash
    cp .env.example .env
    nano .env # Cambia las claves por unas seguras
    ```

## 3. Encender el Sistema
*   Ejecuta el comando maestro:
    ```bash
    docker-compose up -d --build
    ```

## 4. Inicializar Base de Datos
*   Una vez encendido, corre las migraciones de Prisma dentro del contenedor:
    ```bash
    docker-compose exec api npx prisma migrate deploy
    docker-compose exec api npm run seed
    ```

## 5. ¡Listo!
*   Tu sistema estará disponible en la IP de tu servidor (puerto 80).
*   Configura tu dominio en Hostinger apuntando a la IP del VPS.

---
**Agencia IBR - Daniel Vázquez**
*Sistema Operativo SaaS de Alto Rendimiento*
