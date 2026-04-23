import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seed de CRM-OS...');

  // 1. Crear Organización Maestra (Tu Agencia)
  const org = await prisma.organization.upsert({
    where: { domain: 'agencia-ibr.com' },
    update: {},
    create: {
      name: 'IBR Digital Agency',
      domain: 'agencia-ibr.com',
      whiteLabel: true,
    },
  });

  console.log(`✅ Organización creada: ${org.name}`);

  // 2. Crear Subcuenta de Prueba (Tu primer cliente)
  const subAccount = await prisma.subAccount.create({
    data: {
      name: 'Cliente Demo VIP',
      organizationId: org.id,
    },
  });

  console.log(`✅ Subcuenta creada: ${subAccount.name}`);

  // 3. Crear Usuario Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ibr.com',
      password: 'password_seguro_2026', // En producción esto irá hasheado
      name: 'Daniel Vazquez',
      role: 'SUPER_ADMIN',
      subAccountId: subAccount.id,
    },
  });

  console.log(`✅ Usuario SuperAdmin creado: ${admin.name}`);
  
  console.log('🚀 Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
