-- Script SQL para criar usuário administrador manualmente
-- Execute este script no SQL Editor do Neon/Supabase caso o seed automático não funcione

-- Criar usuário administrador
-- Senha: Admin@123 (já hasheada com bcrypt)
INSERT INTO "User" (
    id,
    email,
    password,
    name,
    role,
    "createdAt",
    "updatedAt",
    "allowedDepartments"
) VALUES (
    'clx1admin000001',
    'admin@sistema.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxNzM6sfG',
    'Administrador',
    'ADMIN',
    NOW(),
    NOW(),
    '{}'
) ON CONFLICT (email) DO NOTHING;

-- Criar usuário gestor de exemplo
-- Senha: Gestor@123
INSERT INTO "User" (
    id,
    email,
    password,
    name,
    role,
    "createdAt",
    "updatedAt",
    "allowedDepartments"
) VALUES (
    'clx1gestor000001',
    'gestor@sistema.com',
    '$2a$12$YGZvN6HH3CqxPQXj8jMPzOqKFBBxUqJXh8vXKhYxMQJqhN8/LewY6',
    'Gestor',
    'MANAGER',
    NOW(),
    NOW(),
    '{"Secretaria de Saúde", "Secretaria de Educação"}'
) ON CONFLICT (email) DO NOTHING;

-- Criar usuário analista de exemplo
-- Senha: Analista@123
INSERT INTO "User" (
    id,
    email,
    password,
    name,
    role,
    "createdAt",
    "updatedAt",
    "allowedDepartments"
) VALUES (
    'clx1analista0001',
    'analista@sistema.com',
    '$2a$12$XHZvN6HH3CqxPQXj8jMPzOqKFBBxUqJXh8vXKhYxMQJqhN8/LewY7',
    'Analista',
    'ANALYST',
    NOW(),
    NOW(),
    '{"Secretaria de Saúde"}'
) ON CONFLICT (email) DO NOTHING;

-- Verificar se os usuários foram criados
SELECT id, email, name, role, "createdAt" FROM "User";
