'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  AlertCircle,
  BarChart3,
  FileText,
  Brain,
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Dados mockados - em produção virão da API
  const stats = [
    {
      title: 'Total de Afastamentos',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: 'vs. mês anterior',
    },
    {
      title: 'Dias Totais Afastados',
      value: '8,456',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      description: 'vs. mês anterior',
    },
    {
      title: 'Média de Dias',
      value: '6.8',
      change: '-3%',
      trend: 'down',
      icon: TrendingDown,
      description: 'vs. mês anterior',
    },
    {
      title: 'Alertas Ativos',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: AlertCircle,
      description: 'novos alertas',
    },
  ]

  const quickActions = [
    {
      title: 'Upload de Dados',
      description: 'Carregue novos dados de afastamento',
      icon: FileText,
      href: '/dashboard/upload',
      color: 'blue',
    },
    {
      title: 'Ver Dashboards',
      description: 'Acesse visualizações e análises',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'green',
    },
    {
      title: 'Assistente IA',
      description: 'Faça perguntas sobre os dados',
      icon: Brain,
      href: '/dashboard/ai',
      color: 'purple',
    },
    {
      title: 'Gerar Relatório',
      description: 'Crie relatórios profissionais',
      icon: FileText,
      href: '/dashboard/reports',
      color: 'orange',
    },
  ]

  const recentAlerts = [
    {
      title: 'Pico de Afastamentos - Secretaria da Saúde',
      description: 'Aumento de 45% em afastamentos por CID F32',
      severity: 'high',
      time: 'Há 2 horas',
    },
    {
      title: 'Padrão Detectado - Segundas-feiras',
      description: '28% dos afastamentos iniciam às segundas',
      severity: 'medium',
      time: 'Há 5 horas',
    },
    {
      title: 'Nova Reincidência Identificada',
      description: '15 servidores com 3+ afastamentos em 6 meses',
      severity: 'medium',
      time: 'Há 1 dia',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bem-vindo ao Sistema de Análise
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Visão geral dos dados de absenteísmo-doença
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className={`flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  stat.trend === 'up'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className={`flex items-center justify-center w-12 h-12 bg-${action.color}-100 dark:bg-${action.color}-900/20 rounded-lg mb-4`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>
              Notificações importantes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    alert.severity === 'high'
                      ? 'bg-red-500'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todos os Alertas
            </Button>
          </CardContent>
        </Card>

        {/* Recent Datasets */}
        <Card>
          <CardHeader>
            <CardTitle>Datasets Recentes</CardTitle>
            <CardDescription>
              Últimos arquivos processados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: 'afastamentos_2024_dez.xlsx',
                  date: '27/12/2024',
                  records: '1,234',
                },
                {
                  name: 'dados_saude_nov_2024.csv',
                  date: '30/11/2024',
                  records: '1,156',
                },
                {
                  name: 'absenteismo_out_2024.xlsx',
                  date: '31/10/2024',
                  records: '1,089',
                },
              ].map((dataset, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {dataset.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {dataset.records} registros • {dataset.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todos os Datasets
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
