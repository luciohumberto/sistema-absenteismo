-- Execute estes comandos no Neon SQL Editor para verificar:

-- 1. Ver todas as tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 2. Ver estrutura da tabela users
\d users

-- 3. Ver se o usuário admin existe
SELECT id, email, name, role, "createdAt" 
FROM users 
WHERE email = 'admin@sistema.com';

-- 4. Ver os primeiros caracteres do hash da senha (para confirmar que foi salvo)
SELECT id, email, LEFT(password, 20) as password_inicio 
FROM users 
WHERE email = 'admin@sistema.com';
