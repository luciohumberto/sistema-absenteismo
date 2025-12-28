'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AIInsights } from '@/components/ai-insights'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function TemporalAnalysisPage() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month')
  const [compareYears, setCompareYears] = useState(false)

  // Dados mensais de 2024
  const monthlyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: '2024',
        data: [145, 167, 152, 189, 178, 156, 142, 138, 161, 175, 149, 132],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      ...(compareYears ? [{
        label: '2023',
        data: [132, 149, 138, 165, 172, 148, 135, 142, 155, 168, 141, 128],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
        fill: true
      }] : [])
    ]
  }

  // Dados por dia da semana
  const weekdayData = {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    datasets: [
      {
        label: 'Afastamentos',
        data: [342, 187, 165, 178, 298],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ]
      }
    ]
  }

  // Dados trimestrais
  const quarterlyData = {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [
      {
        label: 'Total de Afastamentos',
        data: [464, 523, 441, 456],
        backgroundColor: 'rgba(59, 130, 246, 0.8)'
      },
      {
        label: 'Dias Perdidos',
        data: [2847, 3215, 2706, 2798],
        backgroundColor: 'rgba(239, 68, 68, 0.8)'
      }
    ]
  }

  // Análise de sazonalidade
  const seasonalPatterns = [
    {
      period: 'Inverno (Jun-Ago)',
      absences: 436,
      avgDays: 6.2,
      mainCauses: ['Gripe/Resfriado (J06)', 'Pneumonia (J18)', 'Bronquite (J20)'],
      trend: 'high',
      change: '+23%'
    },
    {
      period: 'Primavera (Set-Nov)',
      absences: 485,
      avgDays: 5.8,
      mainCauses: ['Alergia (J30)', 'Rinite (J31)', 'Asma (J45)'],
      trend: 'medium',
      change: '+11%'
    },
    {
      period: 'Verão (Dez-Fev)',
      absences: 444,
      avgDays: 5.4,
      mainCauses: ['Dermatite (L20)', 'Gastroenterite (A09)', 'Desidratação (E86)'],
      trend: 'low',
      change: '-8%'
    },
    {
      period: 'Outono (Mar-Mai)',
      absences: 519,
      avgDays: 6.5,
      mainCauses: ['Depressão (F32)', 'Ansiedade (F41)', 'Lombalgia (M54)'],
      trend: 'high',
      change: '+17%'
    }
  ]

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const value = context.parsed.y
            if (!value) return ''
            const total = context.dataset.data.reduce((a: number, b: any) => a + (b || 0), 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${percentage}% do total`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50
        }
      }
    }
  }

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Análise Temporal</h1>
          <p className="text-muted-foreground mt-1">
            Padrões e tendências ao longo do tempo
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={period === 'month' ? 'default' : 'outline'}
            onClick={() => setPeriod('month')}
          >
            Mensal
          </Button>
          <Button
            variant={period === 'quarter' ? 'default' : 'outline'}
            onClick={() => setPeriod('quarter')}
          >
            Trimestral
          </Button>
          <Button
            variant={period === 'year' ? 'default' : 'outline'}
            onClick={() => setPeriod('year')}
          >
            Anual
          </Button>
        </div>
      </div>

      {/* Introdução com IA */}
      <AIInsights 
        type="introduction" 
        dashboardType="temporal"
        title="Sobre a Análise Temporal"
      />

      {/* KPIs Temporais */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pico Mensal</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-red-500"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Abril</div>
            <p className="text-xs text-muted-foreground">
              189 afastamentos (+31% da média)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Mês</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-green-500"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Dezembro</div>
            <p className="text-xs text-muted-foreground">
              132 afastamentos (-18% da média)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendência</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-blue-500"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">↘️ -5.2%</div>
            <p className="text-xs text-muted-foreground">
              Redução nos últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sazonalidade</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-orange-500"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Outono</div>
            <p className="text-xs text-muted-foreground">
              Período crítico (+17%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Evolução Mensal */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Evolução Mensal</CardTitle>
                <CardDescription>Afastamentos por mês em 2024</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCompareYears(!compareYears)}
              >
                {compareYears ? 'Ocultar 2023' : 'Comparar com 2023'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Line data={monthlyData} options={lineOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Dia da Semana */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Dia da Semana</CardTitle>
            <CardDescription>Total de afastamentos por dia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar data={weekdayData} options={barOptions} />
            </div>
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                ⚠️ Síndrome da Segunda-feira
              </p>
              <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                Segundas-feiras apresentam 83% mais afastamentos que outros dias
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Análise Trimestral */}
        {period === 'quarter' && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Comparativo Trimestral</CardTitle>
              <CardDescription>Afastamentos e dias perdidos por trimestre</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar data={quarterlyData} options={barOptions} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Análise de Sazonalidade */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Sazonalidade</CardTitle>
          <CardDescription>Padrões de afastamento por estação do ano</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seasonalPatterns.map((season) => (
              <div
                key={season.period}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{season.period}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        season.trend === 'high'
                          ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : season.trend === 'medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                      }`}
                    >
                      {season.change}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>{season.absences}</strong> afastamentos • Média de{' '}
                      <strong>{season.avgDays}</strong> dias
                    </p>
                    <p>Principais causas: {season.mainCauses.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights e Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle>Insights Temporais</CardTitle>
          <CardDescription>Padrões identificados e recomendações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  Pico Pós-Feriado
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Afastamentos aumentam 45% na semana seguinte a feriados prolongados.
                  Considere reforçar equipes nestes períodos.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
              <div className="text-amber-600 dark:text-amber-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-amber-900 dark:text-amber-100">
                  Campanhas Preventivas
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Implementar campanhas de vacinação antes do inverno pode reduzir em até 30%
                  os afastamentos por doenças respiratórias.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-green-600 dark:text-green-400 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-900 dark:text-green-100">
                  Tendência Positiva
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Redução consistente de 5.2% nos últimos 6 meses indica que as medidas
                  implementadas estão sendo efetivas.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise Inteligente com IA */}
      <AIInsights 
        type="analysis" 
        dashboardType="temporal"
        data={{
          monthlyData: monthlyData.datasets[0].data,
          weekdayPattern: weekdayData.datasets[0].data,
          seasonalPatterns
        }}
        title="Análise Temporal Inteligente"
      />
    </div>
  )
}
