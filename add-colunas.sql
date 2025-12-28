-- Apenas ADICIONAR as colunas que faltam (ignorar erros se já existirem)

ALTER TABLE absence_records ADD COLUMN "ageGroup" TEXT;
ALTER TABLE absence_records ADD COLUMN "cidCode" TEXT;
ALTER TABLE absence_records ADD COLUMN "daysAbsent" INTEGER;
ALTER TABLE absence_records ADD COLUMN "dayOfWeek" TEXT;
ALTER TABLE absence_records ADD COLUMN month INTEGER;
ALTER TABLE absence_records ADD COLUMN year INTEGER;
ALTER TABLE absence_records ADD COLUMN "isMonday" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "isBeforeHoliday" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "diseaseCategory" TEXT;
ALTER TABLE absence_records ADD COLUMN "isRecurrent" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "isProlonged" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "cidDescription" TEXT;

-- Verificar todas as colunas
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'absence_records' 
ORDER BY ordinal_position;
