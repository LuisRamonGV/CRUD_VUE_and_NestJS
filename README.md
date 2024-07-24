# Proyecto Fullstack

Este proyecto es una aplicación fullstack que incluye un backend construido con NestJS y PrismaORM asi como un frontend construido con Nuxt3, Tailwind y Pinia. Utiliza Docker para la gestión de contenedores y Docker Compose para orquestar ambos servicios junto con una base de datos PostgreSQL.

## Requisitos Previos

- Docker: [Instalar Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalar Docker Compose](https://docs.docker.com/compose/install/)


## Configuración de Entorno

En el archivo `docker-compose.yml`, asegúrate de configurar las variables de entorno para la base de datos y las URLs de la API según tus necesidades.

## Ejecución del Proyecto

Para construir y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ``powershell
   git clone https://github.com/LuisRamonGV/CRUD_VUE_and_NestJS.git
   cd CRUD_VUE_and_NestJS

2. Ejecutar Docker Desktop

3. Verificar su funcionamietno
   ``powershell
   docker --version

Si esta funcionadndo debera mostrar la version en uso

4. Ejecutar el comando 
   ``powershell
   docker-compose up --build

5. URL.
   Frontend: http://localhost:5000
   Backend: http://localhost:3000 -