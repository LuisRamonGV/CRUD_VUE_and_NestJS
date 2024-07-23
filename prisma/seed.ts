// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Borra todos los usuarios existentes
  await prisma.user.deleteMany({});

  // Datos de prueba
  const users = Array.from({ length: 20 }, (_, index) => ({
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    password: bcrypt.hashSync('Password123!', 10),
  }));

  // Inserta usuarios en la base de datos
  await prisma.user.createMany({
    data: users,
  });

  console.log('Usuarios creados exitosamente.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
