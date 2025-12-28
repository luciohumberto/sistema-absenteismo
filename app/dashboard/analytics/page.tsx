'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AIInsights } from '@/components/ai-insights'
import { Download, Filter, Calendar } from 'lucide-react'
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
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function AnalyticsPage() {
  // Dados mockados - em produção virão da API
  const analysisData = {
    totalAbsences: 1284,
    totalDays: 7842,
    averageDays: 6.1,
    absenteeismRate: 4.7,
    period: 'Janeiro - Dezembro 2024'
  }

  const monthlyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Afastamentos',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 72, 88, 95, 102],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  }

  const departmentData = {
    labels: ['Saúde', 'Educação', 'Administração', 'Obras', 'Assistência Social'],
    datasets: [
      {
        label: 'Afastamentos por Secretaria',
        data: [450, 320, 180, 120, 95],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  }

  const cidChapterData = {
    labels: ['F - Mental', 'M - Musculoesq.', 'J - Respiratório', 'K - Digestivo', 'Outros'],
    datasets: [
      {
        data: [35, 28, 15, 12, 10],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
      },
    ],
  }

  const ageGroupData = {
    labels: ['< 20', '20-29', '30-39', '40-49', '50-59', '60+'],
    datasets: [
      {
        label: 'Distribuição por Idade',
        data: [12, 85, 195, 245, 180, 48],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboards e Análises
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Visualizações interativas dos dados de absenteísmo
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Período
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Introdução com IA */}
      <AIInsights 
        type="introduction" 
        dashboardType="analytics"
        title="Sobre este Dashboard"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Afastamentos', value: '1,234', change: '+12.5%', positive: false },
          { label: 'Total Dias', value: '8,456', change: '+8.2%', positive: false },
          { label: 'Média Dias', value: '6.8', change: '-3.1%', positive: true },
          { label: 'Taxa Absenteísmo', value: '4.2%', change: '+0.8%', positive: false },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</div>
              <div className="mt-2 flex items-baseline justify-between">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {kpi.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    kpi.positive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {kpi.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evolução Temporal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Temporal de Afastamentos</CardTitle>
          <CardDescription>Total de afastamentos por mês em 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Análises por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Afastamentos por Secretaria</CardTitle>
            <CardDescription>Top 5 secretarias com mais afastamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar data={departmentData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Capítulo CID</CardTitle>
            <CardDescription>Tipos de doença mais comuns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Doughnut data={cidChapterData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Demográfica */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Faixa Etária</CardTitle>
          <CardDescription>Quantidade de afastamentos por idade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Bar data={ageGroupData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Top CIDs */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 CIDs Mais Recorrentes</CardTitle>
          <CardDescription>Códigos CID com maior número de ocorrências</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    CID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Descrição
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ocorrências
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                    % Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { cid: 'F32.1', desc: 'Episódio Depressivo Moderado', count: 145, pct: 11.7 },
                  { cid: 'M54.5', desc: 'Dor Lombar Baixa', count: 132, pct: 10.7 },
                  { cid: 'J06.9', desc: 'Infecção Respiratória Superior', count: 98, pct: 7.9 },
                  { cid: 'F41.1', desc: 'Ansiedade Generalizada', count: 87, pct: 7.1 },
                  { cid: 'M75.1', desc: 'Síndrome do Manguito Rotador', count: 76, pct: 6.2 },
                  { cid: 'K29.7', desc: 'Gastrite', count: 65, pct: 5.3 },
                  { cid: 'F43.1', desc: 'Transtorno de Estresse Pós-Traumático', count: 54, pct: 4.4 },
                  { cid: 'M17.1', desc: 'Gonartrose', count: 48, pct: 3.9 },
                  { cid: 'I10', desc: 'Hipertensão Essencial', count: 42, pct: 3.4 },
                  { cid: 'J45.0', desc: 'Asma', count: 38, pct: 3.1 },
                ].map((item, index) => (
                  <tr key={item.cid} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                      {item.cid}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {item.desc}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">
                      {item.count}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                      {item.pct}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Análise Inteligente com IA */}
      <AIInsights 
        type="analysis" 
        dashboardType="analytics"
        data={analysisData}
        title="Análise Inteligente dos Resultados"
      />
    </div>
  )
}
