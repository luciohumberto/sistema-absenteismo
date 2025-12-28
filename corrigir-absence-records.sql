-- Script para CORRIGIR a tabela absence_records com TODAS as colunas necessárias

-- Excluir a tabela existente e recriar com todas as colunas
DROP TABLE IF EXISTS absence_records CASCADE;

-- Recriar a tabela COMPLETA
CREATE TABLE absence_records (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "datasetId" TEXT NOT NULL REFERENCES datasets(id) ON DELETE CASCADE,
    
    -- Informações do servidor
    "employeeId" TEXT NOT NULL,
    sex TEXT,
    age INTEGER,
    "ageGroup" TEXT,
    
    -- Informações organizacionais
    department TEXT,
    position TEXT,
    "employmentType" TEXT,
    
    -- Informações do CID
    "cidCode" TEXT NOT NULL,
    "cidChapter" TEXT,
    "cidGroup" TEXT,
    "cidDescription" TEXT,
    
    -- Datas
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP,
    "daysAbsent" INTEGER NOT NULL,
    
    -- Análises temporais
    "dayOfWeek" TEXT,
    month INTEGER,
    year INTEGER,
    "isMonday" BOOLEAN DEFAULT false,
    "isBeforeHoliday" BOOLEAN DEFAULT false,
    
    -- Classificações
    "diseaseCategory" TEXT,
    "isRecurrent" BOOLEAN DEFAULT false,
    "isProlonged" BOOLEAN DEFAULT false,
    
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Criar índices
CREATE INDEX idx_absence_records_datasetId ON absence_records("datasetId");
CREATE INDEX idx_absence_records_cidCode ON absence_records("cidCode");
CREATE INDEX idx_absence_records_department ON absence_records(department);
CREATE INDEX idx_absence_records_startDate ON absence_records("startDate");

-- Verificar a estrutura da tabela
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'absence_records' 
ORDER BY ordinal_position;
