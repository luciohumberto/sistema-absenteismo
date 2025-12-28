import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuários
  console.log('👤 Criando usuários...')
  
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@sistema.com' },
    update: {},
    create: {
      email: 'admin@sistema.com',
      password: hashedPassword,
      name: 'Administrador do Sistema',
      role: 'ADMIN',
    },
  })

  const manager = await prisma.user.upsert({
    where: { email: 'gestor@sistema.com' },
    update: {},
    create: {
      email: 'gestor@sistema.com',
      password: hashedPassword,
      name: 'Gestor Principal',
      role: 'MANAGER',
    },
  })

  const analyst = await prisma.user.upsert({
    where: { email: 'analista@sistema.com' },
    update: {},
    create: {
      email: 'analista@sistema.com',
      password: hashedPassword,
      name: 'Analista de Dados',
      role: 'ANALYST',
    },
  })

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@sistema.com' },
    update: {},
    create: {
      email: 'viewer@sistema.com',
      password: hashedPassword,
      name: 'Visualizador',
      role: 'VIEWER',
    },
  })

  console.log(`✅ Usuários criados:`)
  console.log(`   - Admin: admin@sistema.com`)
  console.log(`   - Gestor: gestor@sistema.com`)
  console.log(`   - Analista: analista@sistema.com`)
  console.log(`   - Viewer: viewer@sistema.com`)
  console.log(`   - Senha para todos: admin123`)

  // Criar dataset de exemplo
  console.log('📊 Criando dataset de exemplo...')

  const dataset = await prisma.dataset.create({
    data: {
      name: 'Dados de Exemplo 2024',
      description: 'Dataset de demonstração com dados simulados',
      fileName: 'dados_exemplo_2024.xlsx',
      fileSize: 524288,
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      totalRecords: 100,
      userId: admin.id,
      columnMapping: {
        employeeId: 'matricula',
        sex: 'sexo',
        age: 'idade',
        department: 'secretaria',
        position: 'cargo',
        employmentType: 'vinculo',
        cid: 'cid',
        startDate: 'data_inicio',
        endDate: 'data_fim',
        days: 'dias',
      },
    },
  })

  // Criar registros de exemplo
  console.log('📝 Criando registros de afastamento...')

  const departments = ['SAUDE', 'EDUCACAO', 'ADMINISTRACAO', 'OBRAS', 'ASSISTENCIA_SOCIAL']
  const positions = ['ENFERMEIRO', 'PROFESSOR', 'ASSISTENTE_ADM', 'ENGENHEIRO', 'ASSISTENTE_SOCIAL']
  const cids = [
    { code: 'F32.1', chapter: 'F', group: 'F32', category: 'Transtornos Mentais' },
    { code: 'F41.1', chapter: 'F', group: 'F41', category: 'Transtornos Mentais' },
    { code: 'M54.5', chapter: 'M', group: 'M54', category: 'Doenças Musculoesqueléticas' },
    { code: 'M75.1', chapter: 'M', group: 'M75', category: 'Doenças Musculoesqueléticas' },
    { code: 'J06.9', chapter: 'J', group: 'J06', category: 'Doenças do Aparelho Respiratório' },
    { code: 'J45.0', chapter: 'J', group: 'J45', category: 'Doenças do Aparelho Respiratório' },
    { code: 'K29.7', chapter: 'K', group: 'K29', category: 'Doenças do Aparelho Digestivo' },
    { code: 'I10', chapter: 'I', group: 'I10', category: 'Doenças do Aparelho Circulatório' },
  ]

  const records = []
  
  for (let i = 0; i < 100; i++) {
    const month = Math.floor(Math.random() * 12)
    const day = Math.floor(Math.random() * 28) + 1
    const startDate = new Date(2024, month, day)
    const days = Math.floor(Math.random() * 30) + 1
    const age = Math.floor(Math.random() * 42) + 25 // 25-67 anos
    const cid = cids[Math.floor(Math.random() * cids.length)]
    const dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][startDate.getDay()]

    records.push({
      datasetId: dataset.id,
      employeeId: `EMP${String(1000 + i).padStart(5, '0')}`,
      sex: Math.random() > 0.5 ? 'M' : 'F',
      age: age,
      ageGroup: getAgeGroup(age),
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      employmentType: 'EFETIVO',
      cidCode: cid.code,
      cidChapter: cid.chapter,
      cidGroup: cid.group,
      cidDescription: null,
      startDate: startDate,
      endDate: new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000),
      daysAbsent: days,
      dayOfWeek: dayOfWeek,
      month: month + 1,
      year: 2024,
      isMonday: startDate.getDay() === 1,
      isBeforeHoliday: false,
      diseaseCategory: cid.category,
      isRecurrent: Math.random() > 0.7,
      isProlonged: days > 15,
    })
  }

  await prisma.absenceRecord.createMany({
    data: records,
  })

  // Atualizar dataset com date range
  await prisma.dataset.update({
    where: { id: dataset.id },
    data: {
      dateRangeStart: new Date(2024, 0, 1),
      dateRangeEnd: new Date(2024, 11, 31),
    },
  })

  console.log(`✅ ${records.length} registros de afastamento criados`)

  // Criar análise de exemplo
  console.log('📈 Criando análise de exemplo...')

  const analysis = await prisma.analysis.create({
    data: {
      title: 'Análise Geral - 2024',
      type: 'GENERAL_OVERVIEW',
      datasetId: dataset.id,
      userId: admin.id,
      results: {
        totalRecords: 100,
        totalDays: 1234,
        averageDays: 12.34,
        topDepartment: 'SAUDE',
        topCid: 'F32.1',
      },
      summary: 'Análise geral dos dados de absenteísmo em 2024',
      insights: 'Principais insights identificados pela análise',
      filters: {},
    },
  })

  console.log('✅ Análise de exemplo criada')

  console.log('\n🎉 Seed concluído com sucesso!')
  console.log('\n📋 Resumo:')
  console.log(`   - 4 usuários`)
  console.log(`   - 1 dataset`)
  console.log(`   - 100 registros de afastamento`)
  console.log(`   - 1 análise`)
  console.log('\n🔑 Credenciais de acesso:')
  console.log('   Email: admin@sistema.com')
  console.log('   Senha: admin123')
}

function getAgeGroup(age: number): string {
  if (age < 20) return '< 20'
  if (age < 30) return '20-29'
  if (age < 40) return '30-39'
  if (age < 50) return '40-49'
  if (age < 60) return '50-59'
  return '60+'
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
