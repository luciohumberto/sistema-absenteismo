-- Script para criar TODAS as tabelas necessárias no Neon
-- Execute este script COMPLETO no SQL Editor do Neon

-- 1. Criar tipo enum para roles
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST', 'VIEWER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Criar tabela users (se não existir)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP,
    password TEXT NOT NULL,
    image TEXT,
    role "UserRole" DEFAULT 'ANALYST',
    "allowedDepartments" TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 3. Criar tabela datasets
CREATE TABLE IF NOT EXISTS datasets (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    description TEXT,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP DEFAULT NOW(),
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "totalRecords" INTEGER DEFAULT 0,
    "columnMapping" JSONB
);

-- 4. Criar tabela absence_records
CREATE TABLE IF NOT EXISTS absence_records (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "datasetId" TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    "employeeId" TEXT NOT NULL,
    sex TEXT,
    age INTEGER,
    department TEXT,
    position TEXT,
    "employmentType" TEXT,
    "cid" TEXT,
    "cidChapter" TEXT,
    "cidGroup" TEXT,
    "cidCategory" TEXT,
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    days INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 5. Criar tabela analyses
CREATE TABLE IF NOT EXISTS analyses (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    "datasetId" TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filters JSONB,
    results JSONB,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 6. Criar tabela reports
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    format TEXT NOT NULL,
    "datasetId" TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "analysisId" TEXT REFERENCES analyses(id) ON DELETE CASCADE,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 7. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_datasets_userId ON datasets("userId");
CREATE INDEX IF NOT EXISTS idx_absence_records_datasetId ON absence_records("datasetId");
CREATE INDEX IF NOT EXISTS idx_absence_records_cid ON absence_records("cid");
CREATE INDEX IF NOT EXISTS idx_absence_records_department ON absence_records(department);
CREATE INDEX IF NOT EXISTS idx_analyses_datasetId ON analyses("datasetId");
CREATE INDEX IF NOT EXISTS idx_analyses_userId ON analyses("userId");
CREATE INDEX IF NOT EXISTS idx_reports_datasetId ON reports("datasetId");
CREATE INDEX IF NOT EXISTS idx_reports_userId ON reports("userId");

-- 8. Verificar se as tabelas foram criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
