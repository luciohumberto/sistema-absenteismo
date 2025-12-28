-- Execute linha por linha ou em blocos pequenos

-- Passo 1: Criar enum
DO $$ BEGIN
    CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST', 'VIEWER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Passo 2: Tabela users
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

-- Passo 3: Tabela datasets
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

-- Passo 4: Tabela absence_records (SEM CRIAR ÍNDICES AINDA)
CREATE TABLE IF NOT EXISTS absence_records (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "datasetId" TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    "employeeId" TEXT NOT NULL,
    sex TEXT,
    age INTEGER,
    department TEXT,
    position TEXT,
    "employmentType" TEXT,
    cid TEXT,
    "cidChapter" TEXT,
    "cidGroup" TEXT,
    "cidCategory" TEXT,
    "startDate" TIMESTAMP,
    "endDate" TIMESTAMP,
    days INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Passo 5: Tabela analyses
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

-- Passo 6: Tabela reports
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

-- Passo 7: Verificar tabelas criadas
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
