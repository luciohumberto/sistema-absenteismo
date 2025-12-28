-- Script para ADICIONAR as colunas que faltam na tabela absence_records
-- SEM dropar a tabela existente

-- Adicionar coluna ageGroup
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "ageGroup" TEXT;

-- Adicionar coluna cidCode
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "cidCode" TEXT;

-- Adicionar coluna daysAbsent
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "daysAbsent" INTEGER;

-- Adicionar coluna dayOfWeek
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "dayOfWeek" TEXT;

-- Adicionar coluna month
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS month INTEGER;

-- Adicionar coluna year
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS year INTEGER;

-- Adicionar coluna isMonday
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "isMonday" BOOLEAN DEFAULT false;

-- Adicionar coluna isBeforeHoliday
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "isBeforeHoliday" BOOLEAN DEFAULT false;

-- Adicionar coluna diseaseCategory
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "diseaseCategory" TEXT;

-- Adicionar coluna isRecurrent
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "isRecurrent" BOOLEAN DEFAULT false;

-- Adicionar coluna isProlonged
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "isProlonged" BOOLEAN DEFAULT false;

-- Adicionar coluna cidDescription se não existir
ALTER TABLE absence_records ADD COLUMN IF NOT EXISTS "cidDescription" TEXT;

-- Renomear coluna "cid" para "cidCode" se existir
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'absence_records' AND column_name = 'cid'
    ) THEN
        ALTER TABLE absence_records RENAME COLUMN cid TO "cidCode";
    END IF;
END $$;

-- Renomear coluna "days" para "daysAbsent" se existir
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'absence_records' AND column_name = 'days'
    ) THEN
        ALTER TABLE absence_records RENAME COLUMN days TO "daysAbsent";
    END IF;
END $$;

-- Verificar todas as colunas da tabela
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'absence_records' 
ORDER BY ordinal_position;
