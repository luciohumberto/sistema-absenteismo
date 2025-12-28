const bcrypt = require('bcryptjs');

async function gerarHashCorreto() {
  const senha = 'Admin@123';
  const hash = await bcrypt.hash(senha, 12);
  
  console.log('='.repeat(80));
  console.log('HASH CORRETO PARA A SENHA: Admin@123');
  console.log('='.repeat(80));
  console.log(hash);
  console.log('='.repeat(80));
  console.log('\nExecute este SQL no Neon:\n');
  console.log(`DELETE FROM "User" WHERE email = 'admin@sistema.com';`);
  console.log('');
  console.log(`INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt", "allowedDepartments")`);
  console.log(`VALUES (`);
  console.log(`  'admin-001',`);
  console.log(`  'admin@sistema.com',`);
  console.log(`  '${hash}',`);
  console.log(`  'Administrador',`);
  console.log(`  'ADMIN',`);
  console.log(`  NOW(),`);
  console.log(`  NOW(),`);
  console.log(`  '{}'`);
  console.log(`);`);
  console.log('='.repeat(80));
}

gerarHashCorreto();
