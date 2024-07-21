import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    await prisma.user.deleteMany(); // Limpiar la base de datos antes de las pruebas
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) - crear un usuario', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Passw0rd!',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    expect(response.body.email).toBe(user.email);
  });

  it('/users (GET) - obtener todos los usuarios', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/users/:id (GET) - obtener un usuario por ID', async () => {
    const user = await prisma.user.findFirst();

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200);

    expect(response.body.email).toBe(user.email);
  });

  it('/users/:id (PUT) - actualizar un usuario', async () => {
    const user = await prisma.user.findFirst();
    const updatedUser = {
      name: 'John Updated',
      email: 'john.updated@example.com',
      password: 'NewPassw0rd!',
    };

    const response = await request(app.getHttpServer())
      .put(`/users/${user.id}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body.email).toBe(updatedUser.email);
  });

  it('/users/:id (DELETE) - eliminar un usuario', async () => {
    const user = await prisma.user.findFirst();

    await request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(200);

    const deletedUser = await prisma.user.findUnique({ where: { id: user.id } });
    expect(deletedUser).toBeNull();
  });
});
