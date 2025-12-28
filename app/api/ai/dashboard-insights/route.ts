import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(request: NextRequest) {
  try {
    const { type, dashboardType, data } = await request.json()

    // Se OpenAI configurada, usar análise real
    if (openai) {
      const prompt = generatePrompt(type, dashboardType, data)
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Você é um especialista em análise de dados de absenteísmo-doença no setor público brasileiro. 
            Sua função é gerar insights profundos, acionáveis e baseados em evidências sobre os dados apresentados.
            Sempre contextualize considerando:
            - Trata-se de absenteísmo-doença (afastamentos por motivo de saúde)
            - Setor público brasileiro com suas particularidades
            - CID-10 como sistema de classificação
            - Impacto em produtividade, custos e bem-estar dos servidores
            - Foco em prevenção e ações proativas
            
            Seja direto, use dados quando disponível, e sempre termine com recomendações práticas.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })

      return NextResponse.json({
        insight: completion.choices[0].message.content,
        source: 'openai'
      })
    }

    // Fallback: retornar null para usar conteúdo pré-definido no componente
    return NextResponse.json(
      { insight: null, source: 'fallback' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro ao gerar insight:', error)
    return NextResponse.json(
      { insight: null, source: 'error' },
      { status: 200 }
    )
  }
}

function generatePrompt(type: string, dashboardType: string, data: any): string {
  const baseContext = `Contexto: Sistema de análise de absenteísmo-doença no setor público brasileiro.`

  if (type === 'introduction') {
    const intros: Record<string, string> = {
      analytics: `${baseContext}
      
Gere uma introdução profissional (3-4 parágrafos) para o Dashboard de Análise Geral de Absenteísmo.
Explique:
- O que o usuário verá neste painel
- Importância da análise de absenteísmo-doença
- Principais métricas e indicadores disponíveis
- Como interpretar os dados para tomada de decisão

Seja claro, objetivo e motivador. Use emoticons relevantes (📊, 📈, 🏥).`,

      temporal: `${baseContext}
      
Gere uma introdução profissional (3-4 parágrafos) para o Dashboard de Análise Temporal.
Explique:
- Importância da análise temporal no absenteísmo
- Padrões sazonais e cíclicos esperados
- Como identificar tendências e anomalias
- Utilidade para planejamento estratégico

Use emoticons (📅, ⏰, 📆).`,

      cid: `${baseContext}
      
Gere uma introdução profissional (3-4 parágrafos) para o Dashboard de Análise por CID.
Explique:
- O que é CID-10 e sua importância
- Como os dados estão organizados (capítulos)
- Utilidade para saúde ocupacional
- Conexão entre CIDs e políticas preventivas

Use emoticons (🏥, 🔬, 📋).`,

      patterns: `${baseContext}
      
Gere uma introdução profissional (3-4 parágrafos) para o Dashboard de Detecção de Padrões.
Explique:
- O que são padrões de absenteísmo
- Técnicas de detecção utilizadas
- Padrões comuns (segunda-feira, feriados, recorrência)
- Valor preventivo da identificação de padrões

Use emoticons (🔍, 🎯, 🔎).`
    }

    return intros[dashboardType] || intros.analytics
  }

  if (type === 'analysis') {
    const dataStr = data ? JSON.stringify(data, null, 2) : 'Dados não disponíveis'
    
    const analyses: Record<string, string> = {
      analytics: `${baseContext}

Dashboard: Análise Geral de Absenteísmo
Dados disponíveis: ${dataStr}

Gere uma análise profissional e detalhada (5-6 parágrafos) incluindo:

1. **Visão Geral**: Resumo executivo dos números principais
2. **Tendências**: Padrões identificados nos dados
3. **Alertas**: Pontos críticos que demandam atenção imediata
4. **Comparativos**: Benchmarks e contexto (média do setor público é 3-8%)
5. **Recomendações**: 4-5 ações concretas priorizadas por impacto

Use dados quantitativos quando disponíveis. Seja específico e acionável.
Inclua emoticons de alerta (⚠️, ✓, 📈, 📉) para destacar pontos importantes.`,

      temporal: `${baseContext}

Dashboard: Análise Temporal
Dados: ${dataStr}

Gere análise temporal detalhada incluindo:

1. **Sazonalidade**: Padrões por estação/mês
2. **Dia da Semana**: Análise da "síndrome da segunda-feira"
3. **Tendências de Longo Prazo**: Evolução ao longo do ano
4. **Correlações**: Feriados, campanhas, eventos
5. **Previsões**: Períodos de risco identificados
6. **Ações**: Recomendações com timing específico

Inclua percentuais, comparações e timeline de ações.`,

      cid: `${baseContext}

Dashboard: Análise por CID
Dados: ${dataStr}

Gere análise epidemiológica profunda:

1. **Top CIDs**: Análise dos 5 principais com implicações
2. **Padrões por Capítulo**: F (mental), M (osteomuscular), J (respiratório), etc
3. **Causas Raiz**: Hipóteses sobre causas organizacionais
4. **Custo Estimado**: Impacto financeiro por categoria
5. **ROI de Prevenção**: Investimento vs economia potencial
6. **Protocolos**: Ações específicas por tipo de CID

Seja técnico mas acessível. Use terminologia médica quando necessário.`,

      patterns: `${baseContext}

Dashboard: Padrões de Absenteísmo
Dados: ${dataStr}

Gere análise de padrões com abordagem investigativa:

1. **Síndrome Segunda-feira**: Análise estatística e significância
2. **Efeito Feriado**: Quantificação e custo
3. **Recorrência**: Perfil dos servidores com múltiplos afastamentos
4. **Afastamentos Prolongados**: Causas e gestão de retorno
5. **Clusters Departamentais**: Anomalias organizacionais
6. **Plano de Ação**: Priorização por urgência/impacto com budget

Inclua análise de significância estatística e probabilidades.`
    }

    return analyses[dashboardType] || analyses.analytics
  }

  return `${baseContext}\n\nGere conteúdo relevante para ${dashboardType} - ${type}`
}
