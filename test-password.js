const bcrypt = require('bcryptjs');

// Hash que está no banco de dados (que você criou)
const hashDoBanco = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxNzM6sfG';

// Senha que você está tentando usar
const senhaDigitada = 'Admin@123';

async function testar() {
  console.log('Testando senha...');
  console.log('Senha digitada:', senhaDigitada);
  console.log('Hash no banco:', hashDoBanco);
  
  const resultado = await bcrypt.compare(senhaDigitada, hashDoBanco);
  console.log('Senha corresponde?', resultado);
  
  // Gerar novo hash para comparar
  const novoHash = await bcrypt.hash(senhaDigitada, 10);
  console.log('Novo hash gerado:', novoHash);
  
  const testeNovoHash = await bcrypt.compare(senhaDigitada, novoHash);
  console.log('Novo hash funciona?', testeNovoHash);
}

testar();
