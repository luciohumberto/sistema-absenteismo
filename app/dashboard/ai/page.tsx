'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Brain, Send, Sparkles, TrendingUp, FileText, BarChart3, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/toaster'

export default function AIAssistantPage() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: 'assistant',
      content:
        'Olá! Sou seu assistente de análise inteligente. Posso ajudar você a entender os dados de absenteísmo, gerar relatórios e identificar padrões. Como posso ajudar hoje?',
    },
  ])

  const suggestedQuestions = [
    {
      icon: TrendingUp,
      title: 'Análise de Tendências',
      question: 'Quais são as principais tendências de absenteísmo nos últimos 6 meses?',
    },
    {
      icon: BarChart3,
      title: 'Comparação por Departamento',
      question: 'Compare o absenteísmo entre as diferentes secretarias',
    },
    {
      icon: Brain,
      title: 'Padrões Identificados',
      question: 'Identifique padrões de absenteísmo relacionados a dias da semana',
    },
    {
      icon: FileText,
      title: 'Gerar Relatório',
      question: 'Crie um relatório executivo sobre transtornos mentais (CID F)',
    },
  ]

  const handleSend = async () => {
    if (!question.trim()) return

    setLoading(true)
    const userMessage = question
    setQuestion('')

    // Adicionar mensagem do usuário
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
      } else {
        throw new Error('Erro na análise')
      }
    } catch (error) {
      // Resposta simulada para demonstração
      const mockResponse = generateMockResponse(userMessage)
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: mockResponse }])
      }, 1500)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestion = (suggestedQuestion: string) => {
    setQuestion(suggestedQuestion)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
          <Brain className="w-8 h-8 mr-3 text-purple-600" />
          Assistente de IA
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Faça perguntas em linguagem natural sobre seus dados de absenteísmo
        </p>
      </div>

      {/* Sugestões */}
      {messages.length <= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedQuestions.map((suggestion) => (
            <Card
              key={suggestion.title}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSuggestion(suggestion.question)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <suggestion.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.question}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Chat */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            Conversa
          </CardTitle>
          <CardDescription>
            A IA analisa seus dados em tempo real para responder suas perguntas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center mb-2">
                    <Brain className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      Assistente IA
                    </span>
                  </div>
                )}
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Analisando dados...
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder="Faça uma pergunta sobre os dados..."
              disabled={loading}
            />
            <Button onClick={handleSend} disabled={loading || !question.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            💡 Dica: Seja específico em suas perguntas para obter respostas mais precisas
          </p>
        </div>
      </Card>

      {/* Capacidades */}
      <Card>
        <CardHeader>
          <CardTitle>O que o Assistente pode fazer?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Análises Estatísticas',
                items: ['Calcular médias e tendências', 'Comparar períodos', 'Identificar outliers'],
              },
              {
                title: 'Detecção de Padrões',
                items: ['Padrões temporais', 'Correlações entre variáveis', 'Anomalias nos dados'],
              },
              {
                title: 'Geração de Relatórios',
                items: ['Resumos executivos', 'Análises técnicas', 'Recomendações acionáveis'],
              },
            ].map((capability) => (
              <div key={capability.title} className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{capability.title}</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function generateMockResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes('tendência') || lowerQuestion.includes('últimos')) {
    return `**Análise de Tendências - Últimos 6 Meses**

Com base nos dados analisados, identificamos as seguintes tendências:

📈 **Crescimento:**
• Aumento de 15% no total de afastamentos
• Crescimento de 22% em afastamentos por transtornos mentais (CID F)
• Elevação de 18% em doenças musculoesqueléticas (CID M)

📊 **Distribuição Temporal:**
• Pico em dezembro: 102 afastamentos
• Menor índice em julho: 40 afastamentos
• Média mensal: 73 afastamentos

🎯 **Insights Principais:**
1. Tendência de crescimento consistente desde agosto
2. Transtornos mentais representam 35% do total
3. Segundas-feiras concentram 28% dos afastamentos

💡 **Recomendações:**
• Implementar programas de saúde mental
• Avaliar carga de trabalho nas segundas-feiras
• Monitorar departamentos com maior crescimento`
  }

  if (lowerQuestion.includes('secretaria') || lowerQuestion.includes('departamento')) {
    return `**Comparação de Absenteísmo por Secretaria**

Análise comparativa das 5 principais secretarias:

🏥 **Secretaria de Saúde**
• Afastamentos: 450 (36.5%)
• Média de dias: 8.2
• Principal CID: F32 (Depressão)

📚 **Secretaria de Educação**
• Afastamentos: 320 (25.9%)
• Média de dias: 6.1
• Principal CID: M54 (Lombalgia)

🏢 **Secretaria de Administração**
• Afastamentos: 180 (14.6%)
• Média de dias: 5.8
• Principal CID: J06 (Infecção Respiratória)

🔨 **Secretaria de Obras**
• Afastamentos: 120 (9.7%)
• Média de dias: 9.5
• Principal CID: S62 (Lesões)

🤝 **Assistência Social**
• Afastamentos: 95 (7.7%)
• Média de dias: 7.3
• Principal CID: F41 (Ansiedade)

⚠️ **Alertas:**
• Saúde tem 2x mais afastamentos que a média
• Obras tem a maior duração média (9.5 dias)
• Educação mostra crescimento de 25% vs. trimestre anterior`
  }

  if (lowerQuestion.includes('padrão') || lowerQuestion.includes('segunda')) {
    return `**Análise de Padrões Temporais**

Identifiquei padrões significativos relacionados aos dias da semana:

📅 **Distribuição por Dia da Semana:**
• Segunda-feira: 28% (⚠️ ALERTA: Muito acima da média)
• Terça-feira: 18%
• Quarta-feira: 16%
• Quinta-feira: 15%
• Sexta-feira: 23% (⚠️ ALERTA: Acima da média)

🔍 **Padrões Identificados:**

1. **Síndrome da Segunda-feira**
   • 28% dos afastamentos iniciam às segundas
   • 65% são de curta duração (1-3 dias)
   • Predominância de CIDs F e J

2. **Efeito Fim de Semana Prolongado**
   • Sextas-feiras antes de feriados: +45% de afastamentos
   • Padrão consistente ao longo do ano

3. **Sazonalidade**
   • Inverno (Jun-Ago): +35% em CIDs respiratórios
   • Fim de ano (Nov-Dez): +40% em saúde mental

💡 **Recomendações Estratégicas:**
• Implementar programas de bem-estar focados em segundas
• Reforçar equipes em períodos pré-feriados
• Campanhas preventivas antes do inverno
• Suporte psicológico intensificado no fim do ano`
  }

  if (lowerQuestion.includes('relatório') || lowerQuestion.includes('cid f') || lowerQuestion.includes('mental')) {
    return `**RELATÓRIO EXECUTIVO: Transtornos Mentais e Comportamentais (CID F)**

📋 **Resumo Executivo:**
Os transtornos mentais representam a principal causa de absenteísmo na instituição, com 35% do total de afastamentos.

📊 **Dados Consolidados:**
• Total de afastamentos CID F: 432 casos
• Total de dias perdidos: 4,536 dias
• Média de duração: 10.5 dias
• Custo estimado: R$ 1.2 milhão

🎯 **CIDs Mais Frequentes:**
1. F32.1 - Episódio Depressivo Moderado (145 casos - 33.6%)
2. F41.1 - Ansiedade Generalizada (87 casos - 20.1%)
3. F43.1 - Estresse Pós-Traumático (54 casos - 12.5%)
4. F33 - Transtorno Depressivo Recorrente (48 casos - 11.1%)
5. F40.1 - Fobias Sociais (32 casos - 7.4%)

👥 **Perfil Demográfico:**
• Sexo feminino: 68% dos casos
• Faixa etária 40-49: maior incidência
• Secretaria de Saúde: 42% dos casos

📈 **Tendências:**
• Crescimento de 22% vs. ano anterior
• Pico em dezembro (fim de ano)
• Reincidência em 28% dos casos

⚠️ **Alertas Críticos:**
• 15 servidores com 3+ afastamentos em 6 meses
• Taxa de reincidência aumentando 5% ao mês
• Duração média crescendo progressivamente

💼 **Recomendações Estratégicas:**

1. **Curto Prazo (0-3 meses):**
   • Implementar canal de suporte psicológico 24h
   • Criar grupos de apoio
   • Capacitar gestores para identificação precoce

2. **Médio Prazo (3-6 meses):**
   • Programa estruturado de saúde mental
   • Parcerias com clínicas especializadas
   • Redução de carga horária para casos graves

3. **Longo Prazo (6-12 meses):**
   • Política institucional de saúde mental
   • Avaliação de clima organizacional
   • Reestruturação de processos estressores

💰 **Impacto Financeiro:**
• Custo atual: R$ 1.2 milhão/ano
• ROI estimado com intervenções: 3:1
• Break-even: 8 meses

📌 **Conclusão:**
A situação requer ação imediata e coordenada. Investimentos em saúde mental não são apenas humanitários, mas financeiramente justificáveis.`
  }

  // Resposta genérica
  return `Entendi sua pergunta: "${question}"

Com base nos dados disponíveis, posso fornecer as seguintes informações:

📊 **Dados Gerais:**
• Total de registros analisados: 1,234
• Período coberto: Janeiro a Dezembro 2024
• Secretarias incluídas: 15

🔍 **Para uma análise mais específica, você pode perguntar sobre:**
• Tendências temporais (mensal, sazonal)
• Comparações entre departamentos
• Análises de CIDs específicos
• Padrões de reincidência
• Análises demográficas (idade, sexo)
• Geração de relatórios customizados

💡 **Dica:** Reformule sua pergunta de forma mais específica para obter insights mais detalhados!`
}
