'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem
} from 'chart.js'
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
)

type ChartType = 'line' | 'bar' | 'doughnut' | 'pie'

interface InteractiveChartProps {
  title: string
  description?: string
  data: any
  defaultType?: ChartType
  showTrendline?: boolean
  showGoal?: boolean
  defaultGoal?: number
  allowTypeChange?: boolean
  height?: number
}

export function InteractiveChart({
  title,
  description,
  data,
  defaultType = 'line',
  showTrendline: showTrendlineProp = true,
  showGoal: showGoalProp = true,
  defaultGoal,
  allowTypeChange = true,
  height = 300
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState<ChartType>(defaultType)
  const [showTrendline, setShowTrendline] = useState(showTrendlineProp)
  const [showGoal, setShowGoal] = useState(showGoalProp && !!defaultGoal)
  const [goalValue, setGoalValue] = useState(defaultGoal || 0)
  const [editingGoal, setEditingGoal] = useState(false)
  const chartRef = useRef<any>(null)

  // Calcular linha de tendência (regressão linear simples)
  const calculateTrendline = (dataPoints: number[]): number[] => {
    const n = dataPoints.length
    if (n < 2) return dataPoints

    const xValues = Array.from({ length: n }, (_, i) => i)
    const xSum = xValues.reduce((a, b) => a + b, 0)
    const ySum = dataPoints.reduce((a, b) => a + b, 0)
    const xySum = xValues.reduce((sum, x, i) => sum + x * dataPoints[i], 0)
    const x2Sum = xValues.reduce((sum, x) => sum + x * x, 0)

    const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum)
    const intercept = (ySum - slope * xSum) / n

    return xValues.map(x => slope * x + intercept)
  }

  // Preparar dados com linha de tendência
  const prepareChartData = () => {
    const chartData = { ...data }

    if (showTrendline && (chartType === 'line' || chartType === 'bar')) {
      const mainDataset = chartData.datasets[0]
      if (mainDataset && Array.isArray(mainDataset.data)) {
        const trendlineData = calculateTrendline(mainDataset.data)
        
        chartData.datasets.push({
          label: 'Linha de Tendência',
          data: trendlineData,
          borderColor: 'rgba(239, 68, 68, 0.8)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          tension: 0,
          fill: false,
          type: 'line' // Sempre linha mesmo em gráfico de barras
        })
      }
    }

    return chartData
  }

  // Opções do gráfico com anotações (metas)
  const getChartOptions = (): ChartOptions<any> => {
    const baseOptions: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          displayColors: true,
          callbacks: {
            afterLabel: (context: TooltipItem<any>) => {
              if (showGoal && goalValue > 0) {
                const value = context.parsed.y || context.parsed
                const diff = value - goalValue
                const diffPercent = ((diff / goalValue) * 100).toFixed(1)
                return `Meta: ${goalValue} (${diff > 0 ? '+' : ''}${diffPercent}%)`
              }
              return ''
            }
          }
        },
        annotation: showGoal && goalValue > 0 && (chartType === 'line' || chartType === 'bar') ? {
          annotations: {
            goalLine: {
              type: 'line',
              yMin: goalValue,
              yMax: goalValue,
              borderColor: 'rgba(34, 197, 94, 0.8)',
              borderWidth: 2,
              borderDash: [10, 5],
              label: {
                display: true,
                content: `Meta: ${goalValue}`,
                position: 'end',
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                color: 'white',
                padding: 4,
                font: {
                  size: 11
                }
              }
            }
          }
        } : undefined
      },
      scales: (chartType === 'line' || chartType === 'bar') ? {
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      } : undefined
    }

    return baseOptions
  }

  const renderChart = () => {
    const chartData = prepareChartData()
    const options = getChartOptions()
    const commonProps = {
      ref: chartRef,
      data: chartData,
      options,
      height
    }

    switch (chartType) {
      case 'line':
        return <Line {...commonProps} />
      case 'bar':
        return <Bar {...commonProps} />
      case 'doughnut':
        return <Doughnut {...commonProps} />
      case 'pie':
        return <Pie {...commonProps} />
      default:
        return <Line {...commonProps} />
    }
  }

  const exportChart = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image()
      const link = document.createElement('a')
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = url
      link.click()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Controles de tipo de gráfico */}
            {allowTypeChange && (
              <>
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  title="Gráfico de Linha"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
                  </svg>
                </Button>
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                  title="Gráfico de Barras"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </Button>
                <Button
                  variant={chartType === 'doughnut' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('doughnut')}
                  title="Gráfico de Rosca"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </Button>
              </>
            )}

            {/* Controles de recursos */}
            {(chartType === 'line' || chartType === 'bar') && (
              <>
                <Button
                  variant={showTrendline ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowTrendline(!showTrendline)}
                  title="Linha de Tendência"
                >
                  📈
                </Button>
                <Button
                  variant={showGoal ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (!showGoal && goalValue === 0) {
                      setEditingGoal(true)
                    }
                    setShowGoal(!showGoal)
                  }}
                  title="Linha de Meta"
                >
                  🎯
                </Button>
              </>
            )}

            {/* Exportar */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportChart}
              title="Exportar Gráfico"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Editor de Meta */}
        {editingGoal && (
          <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <label className="text-sm font-medium">Definir Meta:</label>
            <Input
              type="number"
              value={goalValue}
              onChange={(e) => setGoalValue(Number(e.target.value))}
              className="w-32"
              placeholder="Valor"
            />
            <Button
              size="sm"
              onClick={() => {
                setShowGoal(true)
                setEditingGoal(false)
              }}
            >
              Aplicar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingGoal(false)}
            >
              Cancelar
            </Button>
          </div>
        )}

        {/* Indicadores de recursos ativos */}
        {(showTrendline || showGoal) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {showTrendline && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 rounded">
                📈 Tendência ativa
              </span>
            )}
            {showGoal && goalValue > 0 && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 rounded">
                🎯 Meta: {goalValue}
              </span>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div style={{ height: `${height}px` }}>
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  )
}
