import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Delete existing users
  await prisma.user.deleteMany({});

  // Data
  const users = Array.from({ length: 20 }, (_, index) => ({
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    password: bcrypt.hashSync('Password123!', 10),
  }));

  // Insert Users in DB
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
