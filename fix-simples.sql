-- Execute este script LINHA POR LINHA ou em pequenos blocos
-- Copie e cole cada comando separadamente se necessário

-- Primeiro, renomear as colunas que já existem
ALTER TABLE absence_records RENAME COLUMN cid TO "cidCode";
ALTER TABLE absence_records RENAME COLUMN days TO "daysAbsent";

-- Agora adicionar as colunas que faltam (execute uma de cada vez se der erro)
ALTER TABLE absence_records ADD COLUMN "ageGroup" TEXT;
ALTER TABLE absence_records ADD COLUMN "dayOfWeek" TEXT;
ALTER TABLE absence_records ADD COLUMN month INTEGER;
ALTER TABLE absence_records ADD COLUMN year INTEGER;
ALTER TABLE absence_records ADD COLUMN "isMonday" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "isBeforeHoliday" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "diseaseCategory" TEXT;
ALTER TABLE absence_records ADD COLUMN "isRecurrent" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "isProlonged" BOOLEAN DEFAULT false;
ALTER TABLE absence_records ADD COLUMN "cidDescription" TEXT;

-- Verificar resultado
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'absence_records' 
ORDER BY ordinal_position;
