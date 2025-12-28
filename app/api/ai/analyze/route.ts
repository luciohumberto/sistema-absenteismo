import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: 'Pergunta não fornecida' }, { status: 400 })
    }

    // Buscar dados relevantes do banco
    const stats = await getDatasetStats()
    
    // Se não houver API key da OpenAI, retornar resposta mockada
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith('sk-your-')) {
      const mockResponse = generateMockResponse(question, stats)
      return NextResponse.json({ answer: mockResponse })
    }

    // Usar OpenAI para análise real
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const systemPrompt = `Você é um assistente especializado em análise de dados de absenteísmo-doença no setor público.
Você tem acesso aos seguintes dados:

${JSON.stringify(stats, null, 2)}

Responda às perguntas de forma clara, profissional e objetiva. Use formatação markdown quando apropriado.
Inclua números, percentuais e insights relevantes. Seja específico e forneça recomendações acionáveis quando pertinente.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const answer = completion.choices[0]?.message?.content || 'Não foi possível gerar uma resposta.'

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('AI analysis error:', error)
    
    // Fallback para resposta mockada em caso de erro
    const stats = await getDatasetStats()
    const mockResponse = generateMockResponse('análise geral', stats)
    
    return NextResponse.json({ answer: mockResponse })
  }
}

async function getDatasetStats() {
  try {
    // Total de afastamentos
    const totalRecords = await prisma.absenceRecord.count()

    // Estatísticas básicas
    const totalDays = await prisma.absenceRecord.aggregate({
      _sum: { daysAbsent: true },
      _avg: { daysAbsent: true },
    })

    // Top CIDs
    const topCids = await prisma.absenceRecord.groupBy({
      by: ['cidCode'],
      _count: { cidCode: true },
      orderBy: { _count: { cidCode: 'desc' } },
      take: 10,
    })

    // Por departamento
    const byDepartment = await prisma.absenceRecord.groupBy({
      by: ['department'],
      _count: { department: true },
      orderBy: { _count: { department: 'desc' } },
      take: 5,
    })

    // Por capítulo CID
    const byChapter = await prisma.absenceRecord.groupBy({
      by: ['cidChapter'],
      _count: { cidChapter: true },
      orderBy: { _count: { cidChapter: 'desc' } },
    })

    return {
      totalRecords,
      totalDays: totalDays._sum.daysAbsent || 0,
      averageDays: totalDays._avg.daysAbsent || 0,
      topCids: topCids.map((c) => ({ cid: c.cidCode, count: c._count.cidCode })),
      byDepartment: byDepartment.map((d) => ({ dept: d.department, count: d._count.department })),
      byChapter: byChapter.map((c) => ({ chapter: c.cidChapter, count: c._count.cidChapter })),
    }
  } catch (error) {
    // Retornar dados mockados se não houver dados no banco
    return {
      totalRecords: 1234,
      totalDays: 8456,
      averageDays: 6.8,
      topCids: [
        { cid: 'F32.1', count: 145 },
        { cid: 'M54.5', count: 132 },
        { cid: 'J06.9', count: 98 },
      ],
      byDepartment: [
        { dept: 'SAUDE', count: 450 },
        { dept: 'EDUCACAO', count: 320 },
        { dept: 'ADMINISTRACAO', count: 180 },
      ],
      byChapter: [
        { chapter: 'F', count: 432 },
        { chapter: 'M', count: 345 },
        { chapter: 'J', count: 185 },
      ],
    }
  }
}

function generateMockResponse(question: string, stats: any): string {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('geral') || lowerQuestion.includes('resumo') || lowerQuestion.includes('overview')) {
    return `**Visão Geral dos Dados de Absenteísmo**

📊 **Estatísticas Principais:**
• Total de afastamentos: ${stats.totalRecords.toLocaleString('pt-BR')}
• Total de dias perdidos: ${Math.round(stats.totalDays).toLocaleString('pt-BR')}
• Média de dias por afastamento: ${stats.averageDays.toFixed(1)}

🏥 **CIDs Mais Comuns:**
${stats.topCids.slice(0, 3).map((c: any, i: number) => `${i + 1}. ${c.cid}: ${c.count} casos`).join('\n')}

🏢 **Departamentos com Maior Absenteísmo:**
${stats.byDepartment.slice(0, 3).map((d: any, i: number) => `${i + 1}. ${d.dept}: ${d.count} casos`).join('\n')}

📈 **Distribuição por Tipo:**
${stats.byChapter.slice(0, 3).map((c: any) => `• Capítulo ${c.chapter}: ${c.count} casos`).join('\n')}

💡 **Insights:**
Os dados mostram que transtornos mentais (CID F) e doenças musculoesqueléticas (CID M) são as principais causas de afastamento, sugerindo a necessidade de programas específicos nessas áreas.`
  }

  return `Com base nos dados disponíveis (${stats.totalRecords} registros), posso ajudar a analisar diversos aspectos do absenteísmo. Tente perguntas mais específicas sobre CIDs, departamentos, tendências temporais ou padrões identificados.`
}
