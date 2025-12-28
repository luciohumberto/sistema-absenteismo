'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AIInsights } from '@/components/ai-insights'
import { TrendingUp, AlertTriangle, Calendar, Users } from 'lucide-react'

export default function CIDAnalysisPage() {
  const cidChapters = [
    { chapter: 'F', name: 'Transtornos Mentais e Comportamentais', count: 432, percent: 35, trend: '+22%', color: 'red' },
    { chapter: 'M', name: 'Doenças do Sistema Musculoesquelético', count: 345, percent: 28, trend: '+18%', color: 'orange' },
    { chapter: 'J', name: 'Doenças do Aparelho Respiratório', count: 185, percent: 15, trend: '+8%', color: 'blue' },
    { chapter: 'K', name: 'Doenças do Aparelho Digestivo', count: 148, percent: 12, trend: '+5%', color: 'green' },
    { chapter: 'I', name: 'Doenças do Aparelho Circulatório', count: 124, percent: 10, trend: '+3%', color: 'purple' },
  ]

  const topCids = [
    { cid: 'F32.1', name: 'Episódio Depressivo Moderado', count: 145, days: 2175, avgDays: 15, dept: 'SAUDE' },
    { cid: 'M54.5', name: 'Dor Lombar Baixa', count: 132, days: 1848, avgDays: 14, dept: 'EDUCACAO' },
    { cid: 'J06.9', name: 'Infecção Respiratória Superior', count: 98, days: 392, avgDays: 4, dept: 'TODOS' },
    { cid: 'F41.1', name: 'Ansiedade Generalizada', count: 87, days: 1218, avgDays: 14, dept: 'SAUDE' },
    { cid: 'M75.1', name: 'Síndrome do Manguito Rotador', count: 76, days: 1596, avgDays: 21, dept: 'OBRAS' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Análise por CID
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Classificação Internacional de Doenças - Análise Detalhada
        </p>
      </div>

      {/* Introdução com IA */}
      <AIInsights 
        type="introduction" 
        dashboardType="cid"
        title="Sobre a Análise por CID"
      />

      {/* Resumo por Capítulo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cidChapters.map((chapter) => (
          <Card key={chapter.chapter}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg bg-${chapter.color}-100 dark:bg-${chapter.color}-900/20 flex items-center justify-center`}>
                  <span className={`text-xl font-bold text-${chapter.color}-600 dark:text-${chapter.color}-400`}>
                    {chapter.chapter}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{chapter.percent}%</div>
                  <div className="text-xs text-green-600">{chapter.trend}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {chapter.name}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {chapter.count} casos
                </span>
                <Button variant="ghost" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top CIDs Detalhados */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 CIDs Mais Recorrentes</CardTitle>
          <CardDescription>
            Análise detalhada dos códigos com maior impacto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCids.map((cid, index) => (
              <div key={cid.cid} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {cid.cid}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cid.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Principal em: {cid.dept}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cid.count}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Ocorrências
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cid.days}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Dias Totais
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {cid.avgDays}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Média Dias
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas por CID */}
      <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alertas e Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                title: 'Crescimento Acelerado em Transtornos Mentais (F)',
                description: 'Aumento de 22% vs. trimestre anterior. Recomenda-se implementar programa de apoio psicológico.',
                severity: 'high',
              },
              {
                title: 'CID M54.5 concentrado na Educação',
                description: 'Lombalgia representa 40% dos afastamentos do setor. Avaliar ergonomia.',
                severity: 'medium',
              },
              {
                title: 'Padrão sazonal em CIDs respiratórios',
                description: 'Pico previsto para junho-agosto. Considere campanhas preventivas.',
                severity: 'medium',
              },
            ].map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  alert.severity === 'high'
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                }`}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {alert.title}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {alert.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise Inteligente com IA */}
      <AIInsights 
        type="analysis" 
        dashboardType="cid"
        data={{ cidChapters, topCids }}
        title="Análise Epidemiológica Inteligente"
      />
    </div>
  )
}
