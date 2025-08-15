const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const email = 'xpireshot@gmail.com';
    const password = 'ExtremeBlack2022#';
    const name = 'Admin Extreme Contingência';

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log('Usuário já existe:', existingUser.email);
      return;
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário admin
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('Email:', user.email);
    console.log('Nome:', user.name);
    console.log('Role:', user.role);
    console.log('ID:', user.id);

  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
