'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Download,
  Eye,
  FileSpreadsheet,
  Printer,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import { toast } from '@/components/ui/toaster'

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const reportTypes = [
    {
      id: 'executive',
      title: 'Resumo Executivo',
      description: 'Relatório conciso de 2-3 páginas com principais indicadores e insights',
      icon: FileText,
      color: 'blue',
      pages: '2-3',
      time: '30 segundos',
    },
    {
      id: 'technical',
      title: 'Relatório Técnico Completo',
      description: 'Análise detalhada com todos os dados, gráficos e metodologia',
      icon: FileText,
      color: 'purple',
      pages: '15-20',
      time: '1-2 minutos',
    },
    {
      id: 'dashboard',
      title: 'Snapshot do Dashboard',
      description: 'Captura visual do dashboard atual com todos os gráficos',
      icon: Eye,
      color: 'green',
      pages: '1-2',
      time: '15 segundos',
    },
    {
      id: 'custom',
      title: 'Relatório Personalizado',
      description: 'Configure seções específicas e conteúdo customizado',
      icon: FileSpreadsheet,
      color: 'orange',
      pages: 'Variável',
      time: 'Variável',
    },
  ]

  const exportFormats = [
    { id: 'pdf', name: 'PDF', icon: FileText, recommended: true },
    { id: 'docx', name: 'Word', icon: FileText },
    { id: 'xlsx', name: 'Excel', icon: FileSpreadsheet },
    { id: 'print', name: 'Imprimir', icon: Printer },
  ]

  const recentReports = [
    {
      title: 'Relatório Executivo - Dezembro 2024',
      type: 'executive',
      date: '27/12/2024',
      format: 'PDF',
    },
    {
      title: 'Análise Técnica - Transtornos Mentais',
      type: 'technical',
      date: '20/12/2024',
      format: 'PDF',
    },
    {
      title: 'Dashboard Mensal - Novembro',
      type: 'dashboard',
      date: '30/11/2024',
      format: 'PDF',
    },
  ]

  const handleGenerate = async (type: string, format: string) => {
    setGenerating(true)
    setSelectedType(type)

    try {
      // Simular geração (em produção, chamaria a API)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: 'Relatório gerado com sucesso!',
        description: 'O download iniciará automaticamente.',
      })

      // Simular download
      console.log(`Gerando relatório ${type} em formato ${format}`)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar relatório',
        description: 'Tente novamente em alguns instantes.',
      })
    } finally {
      setGenerating(false)
      setSelectedType(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Geração de Relatórios
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Crie relatórios profissionais prontos para apresentação
        </p>
      </div>

      {/* Tipos de Relatório */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`flex items-center justify-center w-12 h-12 bg-${report.color}-100 dark:bg-${report.color}-900/20 rounded-lg`}>
                  <report.icon className={`w-6 h-6 text-${report.color}-600 dark:text-${report.color}-400`} />
                </div>
                <div className="text-right text-xs text-gray-500 space-y-1">
                  <div>{report.pages} páginas</div>
                  <div>{report.time}</div>
                </div>
              </div>
              <CardTitle className="mt-4">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {exportFormats.map((format) => (
                  <Button
                    key={format.id}
                    variant={format.recommended ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleGenerate(report.id, format.id)}
                    disabled={generating}
                  >
                    {generating && selectedType === report.id ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <format.icon className="w-4 h-4 mr-2" />
                    )}
                    {format.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Opções Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle>Opções Avançadas</CardTitle>
          <CardDescription>
            Customize ainda mais seus relatórios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Incluir Logo',
                description: 'Adicione logo institucional',
                enabled: true,
              },
              {
                title: 'Cabeçalho Personalizado',
                description: 'Configure cabeçalho e rodapé',
                enabled: true,
              },
              {
                title: 'Análise de IA',
                description: 'Incluir insights gerados por IA',
                enabled: true,
              },
              {
                title: 'Gráficos em Alta Resolução',
                description: 'Qualidade otimizada para impressão',
                enabled: true,
              },
              {
                title: 'Dados Brutos',
                description: 'Anexar tabelas completas',
                enabled: false,
              },
              {
                title: 'Comparação Temporal',
                description: 'Comparar com períodos anteriores',
                enabled: true,
              },
            ].map((option) => (
              <div
                key={option.title}
                className="flex items-start p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex-shrink-0 mt-1">
                  {option.enabled ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {option.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Gerados Recentemente</CardTitle>
          <CardDescription>
            Acesse relatórios criados anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {report.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {report.format} • {report.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-2">Sobre os Relatórios:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Todos os relatórios são gerados com base nos dados filtrados atualmente</li>
                <li>PDFs são otimizados para impressão profissional</li>
                <li>Documentos Word (.docx) podem ser editados após a geração</li>
                <li>Planilhas Excel incluem dados brutos para análises complementares</li>
                <li>A IA gera automaticamente insights e recomendações contextualizadas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
