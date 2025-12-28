-- APENAS VERIFICAR quais colunas existem agora
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'absence_records' 
ORDER BY ordinal_position;
