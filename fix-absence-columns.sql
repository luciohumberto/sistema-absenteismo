-- Script CORRIGIDO para adicionar colunas no PostgreSQL

-- Adicionar ageGroup
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'ageGroup') THEN
        ALTER TABLE absence_records ADD COLUMN "ageGroup" TEXT;
    END IF;
END $$;

-- Adicionar cidCode
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'cidCode') THEN
        ALTER TABLE absence_records ADD COLUMN "cidCode" TEXT;
    END IF;
END $$;

-- Adicionar daysAbsent
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'daysAbsent') THEN
        ALTER TABLE absence_records ADD COLUMN "daysAbsent" INTEGER;
    END IF;
END $$;

-- Adicionar dayOfWeek
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'dayOfWeek') THEN
        ALTER TABLE absence_records ADD COLUMN "dayOfWeek" TEXT;
    END IF;
END $$;

-- Adicionar month
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'month') THEN
        ALTER TABLE absence_records ADD COLUMN month INTEGER;
    END IF;
END $$;

-- Adicionar year
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'year') THEN
        ALTER TABLE absence_records ADD COLUMN year INTEGER;
    END IF;
END $$;

-- Adicionar isMonday
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'isMonday') THEN
        ALTER TABLE absence_records ADD COLUMN "isMonday" BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Adicionar isBeforeHoliday
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'isBeforeHoliday') THEN
        ALTER TABLE absence_records ADD COLUMN "isBeforeHoliday" BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Adicionar diseaseCategory
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'diseaseCategory') THEN
        ALTER TABLE absence_records ADD COLUMN "diseaseCategory" TEXT;
    END IF;
END $$;

-- Adicionar isRecurrent
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'isRecurrent') THEN
        ALTER TABLE absence_records ADD COLUMN "isRecurrent" BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Adicionar isProlonged
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'isProlonged') THEN
        ALTER TABLE absence_records ADD COLUMN "isProlonged" BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Adicionar cidDescription
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'cidDescription') THEN
        ALTER TABLE absence_records ADD COLUMN "cidDescription" TEXT;
    END IF;
END $$;

-- Renomear cid para cidCode se existir
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'cid') THEN
        ALTER TABLE absence_records RENAME COLUMN cid TO "cidCode";
    END IF;
END $$;

-- Renomear days para daysAbsent se existir
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'absence_records' AND column_name = 'days') THEN
        ALTER TABLE absence_records RENAME COLUMN days TO "daysAbsent";
    END IF;
END $$;

-- Verificar resultado
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'absence_records' 
ORDER BY ordinal_position;
