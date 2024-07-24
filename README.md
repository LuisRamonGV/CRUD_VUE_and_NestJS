# Fullstack project

This project is a fullstack application that includes a backend built with NestJS and PrismaORM as well as a frontend built with Nuxt3, Tailwind and Pinia. It uses Docker for container management and Docker Compose to orchestrate both services along with a PostgreSQL database.

# Previous requirements

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Enviroment configuration

In the `docker-compose.yml` file, make sure to configure the environment variables for the database and API URLs according to your needs.

# Project execution

To build and run the project, follow these steps:

1. Clone the repository:
   ``powershell
   - git clone https://github.com/LuisRamonGV/CRUD_VUE_and_NestJS.git
   - cd CRUD_VUE_and_NestJS

3. Run Docker Desktop

4. Verify its operation
   ``powershell
   - docker --version
   - If it is working, it should show the version in use

6. Run the command
   ``powershell docker-compose up --build

7. URL.
   - Frontend: http://localhost:5000
   - Backend: http://localhost:3000 

