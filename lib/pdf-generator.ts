import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface ReportData {
  title: string
  subtitle?: string
  date: string
  author: string
  sections: ReportSection[]
  summary?: SummaryData
  charts?: ChartData[]
}

export interface ReportSection {
  title: string
  content: string | string[]
  type: 'text' | 'table' | 'list'
  data?: any[]
}

export interface SummaryData {
  totalAbsences: number
  totalDays: number
  averageDays: number
  absenteeismRate: number
  period: string
}

export interface ChartData {
  title: string
  image: string // base64
}

export async function generatePDFReport(data: ReportData): Promise<Blob> {
  const doc = new jsPDF()
  let yPosition = 20

  // Configurações
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin

  // Função auxiliar para verificar quebra de página
  const checkPageBreak = (neededSpace: number) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = 20
      return true
    }
    return false
  }

  // Cabeçalho
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(data.title, margin, yPosition)
  yPosition += 10

  if (data.subtitle) {
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(data.subtitle, margin, yPosition)
    yPosition += 8
  }

  // Metadados
  doc.setFontSize(10)
  doc.setTextColor(80, 80, 80)
  doc.text(`Data: ${data.date}`, margin, yPosition)
  yPosition += 5
  doc.text(`Gerado por: ${data.author}`, margin, yPosition)
  yPosition += 15

  // Linha separadora
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  // Resumo Executivo (se existir)
  if (data.summary) {
    checkPageBreak(50)
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('Resumo Executivo', margin, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    
    const summaryLines = [
      `Período: ${data.summary.period}`,
      `Total de Afastamentos: ${data.summary.totalAbsences}`,
      `Total de Dias Perdidos: ${data.summary.totalDays}`,
      `Média de Dias por Afastamento: ${data.summary.averageDays.toFixed(1)}`,
      `Taxa de Absenteísmo: ${data.summary.absenteeismRate.toFixed(2)}%`
    ]

    summaryLines.forEach(line => {
      checkPageBreak(7)
      doc.text(line, margin + 5, yPosition)
      yPosition += 6
    })

    yPosition += 10
  }

  // Seções do relatório
  for (const section of data.sections) {
    checkPageBreak(20)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(section.title, margin, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')

    if (section.type === 'text') {
      const content = Array.isArray(section.content) 
        ? section.content.join('\n\n') 
        : section.content

      const lines = doc.splitTextToSize(content, contentWidth)
      
      lines.forEach((line: string) => {
        checkPageBreak(7)
        doc.text(line, margin, yPosition)
        yPosition += 6
      })
      
      yPosition += 5

    } else if (section.type === 'list' && Array.isArray(section.content)) {
      section.content.forEach(item => {
        checkPageBreak(7)
        doc.text(`• ${item}`, margin + 5, yPosition)
        yPosition += 6
      })
      yPosition += 5

    } else if (section.type === 'table' && section.data) {
      checkPageBreak(30)
      
      const tableData = section.data.map(row => Object.values(row).map(val => String(val ?? '')))
      const headers = section.data.length > 0 ? Object.keys(section.data[0]) : []

      autoTable(doc, {
        head: [headers],
        body: tableData as any,
        startY: yPosition,
        margin: { left: margin, right: margin },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 10
    }
  }

  // Gráficos (se existirem)
  if (data.charts && data.charts.length > 0) {
    for (const chart of data.charts) {
      checkPageBreak(100)

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.text(chart.title, margin, yPosition)
      yPosition += 8

      try {
        doc.addImage(
          chart.image,
          'PNG',
          margin,
          yPosition,
          contentWidth,
          80
        )
        yPosition += 90
      } catch (error) {
        console.error('Erro ao adicionar gráfico:', error)
        yPosition += 10
      }
    }
  }

  // Rodapé em todas as páginas
  const pageCount = doc.getNumberOfPages()
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
    doc.text(
      'Sistema de Análise de Absenteísmo',
      margin,
      pageHeight - 10
    )
  }

  return doc.output('blob')
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Função helper para capturar gráficos como imagem
export function captureChartAsImage(chartElement: HTMLCanvasElement): string {
  return chartElement.toDataURL('image/png')
}
