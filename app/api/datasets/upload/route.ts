import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'
import { getCIDChapter, getCIDGroup, getDiseaseCategory, getAgeGroup } from '@/lib/utils'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Ler arquivo
    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet)

    if (data.length === 0) {
      return NextResponse.json({ error: 'Arquivo vazio' }, { status: 400 })
    }

    // Mapear colunas automaticamente
    const firstRow: any = data[0]
    const columnMapping = detectColumns(Object.keys(firstRow))

    // Criar dataset
    const dataset = await prisma.dataset.create({
      data: {
        name: file.name,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        totalRecords: data.length,
        columnMapping: columnMapping,
        userId: 'admin-001', // User ID do admin
      },
    })

    // Processar e inserir registros
    let processedCount = 0
    const batchSize = 100

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      const records = batch.map((row: any) => {
        const cidCode = row[columnMapping.cid] || ''
        const age = parseInt(row[columnMapping.age]) || null
        const startDate = new Date(row[columnMapping.startDate])
        const daysAbsent = parseInt(row[columnMapping.days]) || 0

        return {
          datasetId: dataset.id,
          employeeId: String(row[columnMapping.employeeId] || ''),
          sex: row[columnMapping.sex] || null,
          age: age,
          ageGroup: age ? getAgeGroup(age) : null,
          department: row[columnMapping.department] || null,
          position: row[columnMapping.position] || null,
          employmentType: row[columnMapping.employmentType] || null,
          cidCode: cidCode,
          cidChapter: getCIDChapter(cidCode),
          cidGroup: getCIDGroup(cidCode),
          cidDescription: null,
          startDate: startDate,
          endDate: row[columnMapping.endDate] ? new Date(row[columnMapping.endDate]) : null,
          daysAbsent: daysAbsent,
          dayOfWeek: startDate.toLocaleDateString('pt-BR', { weekday: 'long' }),
          month: startDate.getMonth() + 1,
          year: startDate.getFullYear(),
          isMonday: startDate.getDay() === 1,
          isBeforeHoliday: false, // TODO: implementar detecção
          diseaseCategory: getDiseaseCategory(getCIDChapter(cidCode)),
          isRecurrent: false, // TODO: implementar detecção
          isProlonged: daysAbsent > 15,
        }
      })

      await prisma.absenceRecord.createMany({
        data: records,
        skipDuplicates: true,
      })

      processedCount += records.length
    }

    // Atualizar dataset com informações calculadas
    const dateRange = await prisma.absenceRecord.aggregate({
      where: { datasetId: dataset.id },
      _min: { startDate: true },
      _max: { startDate: true },
    })

    await prisma.dataset.update({
      where: { id: dataset.id },
      data: {
        dateRangeStart: dateRange._min.startDate,
        dateRangeEnd: dateRange._max.startDate,
      },
    })

    return NextResponse.json({
      success: true,
      datasetId: dataset.id,
      totalRecords: processedCount,
      columns: Object.keys(columnMapping),
      dateRange: {
        start: dateRange._min.startDate,
        end: dateRange._max.startDate,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar arquivo' },
      { status: 500 }
    )
  }
}

function detectColumns(headers: string[]): any {
  const mapping: any = {}

  // Normalizar headers
  const normalized = headers.map((h) => h.toLowerCase().trim())

  // Detectar cada coluna
  mapping.employeeId = findColumn(normalized, ['matricula', 'matrícula', 'id', 'codigo', 'código'])
  mapping.sex = findColumn(normalized, ['sexo', 'genero', 'gênero', 'sex', 'gender'])
  mapping.age = findColumn(normalized, ['idade', 'age'])
  mapping.department = findColumn(normalized, ['secretaria', 'departamento', 'orgao', 'órgão', 'setor'])
  mapping.position = findColumn(normalized, ['cargo', 'funcao', 'função', 'position'])
  mapping.employmentType = findColumn(normalized, ['vinculo', 'vínculo', 'tipo', 'contrato'])
  mapping.cid = findColumn(normalized, ['cid', 'codigo_cid', 'código_cid'])
  mapping.startDate = findColumn(normalized, ['data_inicio', 'inicio', 'início', 'data_afastamento', 'start_date'])
  mapping.endDate = findColumn(normalized, ['data_fim', 'fim', 'data_retorno', 'end_date'])
  mapping.days = findColumn(normalized, ['dias', 'quantidade_dias', 'duracao', 'duração', 'days'])

  // Converter índices para nomes originais
  Object.keys(mapping).forEach((key) => {
    if (mapping[key] !== -1) {
      mapping[key] = headers[mapping[key]]
    }
  })

  return mapping
}

function findColumn(headers: string[], candidates: string[]): number {
  for (const candidate of candidates) {
    const index = headers.findIndex((h) => h.includes(candidate))
    if (index !== -1) return index
  }
  return -1
}
