'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AIInsights } from '@/components/ai-insights'
import { AlertCircle, TrendingUp, Users, Clock } from 'lucide-react'

export default function PatternsPage() {
  const patterns = [
    {
      title: 'Síndrome da Segunda-feira',
      description: '28% dos afastamentos iniciam às segundas-feiras',
      severity: 'high',
      impact: 'Alto',
      affected: 346,
      icon: AlertCircle,
      recommendations: [
        'Implementar check-ins semanais nas segundas',
        'Flexibilizar horários de entrada',
        'Programas de bem-estar focados no início da semana',
      ],
    },
    {
      title: 'Padrão Pré-Feriados',
      description: 'Aumento de 45% em afastamentos nas vésperas de feriados prolongados',
      severity: 'high',
      impact: 'Alto',
      affected: 124,
      icon: TrendingUp,
      recommendations: [
        'Reforçar equipes em períodos críticos',
        'Política clara sobre ausências em feriados',
        'Monitoramento preventivo',
      ],
    },
    {
      title: 'Reincidência Crítica',
      description: '15 servidores com 3+ afastamentos em 6 meses',
      severity: 'high',
      impact: 'Muito Alto',
      affected: 15,
      icon: Users,
      recommendations: [
        'Acompanhamento individualizado',
        'Avaliação de saúde ocupacional',
        'Possível readaptação de função',
      ],
    },
    {
      title: 'Afastamentos Prolongados',
      description: '23% dos afastamentos excedem 15 dias',
      severity: 'medium',
      impact: 'Médio',
      affected: 284,
      icon: Clock,
      recommendations: [
        'Revisar processos de acompanhamento',
        'Suporte para retorno gradual',
        'Prevenção de casos crônicos',
      ],
    },
  ]

  const reincidenceList = [
    { id: 'EMPXXXX1', department: 'SAUDE', count: 5, lastCid: 'F32.1', daysTotal: 75 },
    { id: 'EMPXXXX2', department: 'EDUCACAO', count: 4, lastCid: 'M54.5', daysTotal: 62 },
    { id: 'EMPXXXX3', department: 'SAUDE', count: 4, lastCid: 'F41.1', daysTotal: 56 },
    { id: 'EMPXXXX4', department: 'ADMINISTRACAO', count: 4, lastCid: 'J06.9', daysTotal: 48 },
    { id: 'EMPXXXX5', department: 'OBRAS', count: 3, lastCid: 'M75.1', daysTotal: 63 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Padrões e Alertas
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Detecção inteligente de padrões e situações críticas
        </p>
      </div>

      {/* Introdução com IA */}
      <AIInsights 
        type="introduction" 
        dashboardType="patterns"
        title="Sobre a Detecção de Padrões"
      />

      {/* Padrões Identificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patterns.map((pattern) => (
          <Card
            key={pattern.title}
            className={`${
              pattern.severity === 'high'
                ? 'border-red-200 dark:border-red-800'
                : 'border-yellow-200 dark:border-yellow-800'
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <pattern.icon
                      className={`w-5 h-5 mr-2 ${
                        pattern.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                      }`}
                    />
                    {pattern.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{pattern.description}</CardDescription>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pattern.severity === 'high'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}
                >
                  {pattern.impact}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Servidores afetados
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pattern.affected}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Recomendações:
                </h4>
                <ul className="space-y-1">
                  {pattern.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                      <span className="mr-2 text-blue-600">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Reincidência */}
      <Card>
        <CardHeader>
          <CardTitle>Servidores com Alta Reincidência</CardTitle>
          <CardDescription>
            Casos que requerem atenção especial e acompanhamento individualizado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    ID Servidor
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Secretaria
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nº Afastamentos
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Último CID
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Dias Totais
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {reincidenceList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {item.department}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                        {item.count}x
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {item.lastCid}
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-gray-700 dark:text-gray-300">
                      {item.daysTotal}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button variant="outline" size="sm">
                        Ver Histórico
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ações Recomendadas */}
      <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            Plano de Ação Sugerido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                priority: 'Urgente',
                action: 'Programa de Saúde Mental',
                description: 'Implementar canal 24h de suporte psicológico e grupos de apoio',
                timeline: '30 dias',
                responsible: 'RH + Saúde Ocupacional',
              },
              {
                priority: 'Alta',
                action: 'Revisão Ergonômica',
                description: 'Avaliar postos de trabalho com alto índice de afastamento por lombalgia',
                timeline: '60 dias',
                responsible: 'Engenharia + Saúde Ocupacional',
              },
              {
                priority: 'Média',
                action: 'Campanhas Preventivas',
                description: 'Vacinação e orientação sobre doenças respiratórias antes do inverno',
                timeline: '90 dias',
                responsible: 'Saúde Ocupacional',
              },
            ].map((action, index) => (
              <div
                key={index}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {action.action}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      action.priority === 'Urgente'
                        ? 'bg-red-100 text-red-800'
                        : action.priority === 'Alta'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {action.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {action.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>📅 {action.timeline}</span>
                  <span>👤 {action.responsible}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Inteligente com IA */}
      <AIInsights 
        type="analysis" 
        dashboardType="patterns"
        data={{ patterns }}
        title="Análise Detalhada de Padrões"
      />
    </div>
  )
}
