import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Packer
} from 'docx'
import { ReportData, ReportSection } from './pdf-generator'

export async function generateWordReport(data: ReportData): Promise<Blob> {
  const children: any[] = []

  // Título
  children.push(
    new Paragraph({
      text: data.title,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    })
  )

  // Subtítulo
  if (data.subtitle) {
    children.push(
      new Paragraph({
        text: data.subtitle,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    )
  }

  // Metadados
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Data: ${data.date}`,
          size: 20
        })
      ],
      spacing: { after: 100 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Gerado por: ${data.author}`,
          size: 20
        })
      ],
      spacing: { after: 400 }
    })
  )

  // Linha separadora
  children.push(
    new Paragraph({
      text: '─'.repeat(80),
      spacing: { after: 200 }
    })
  )

  // Resumo Executivo
  if (data.summary) {
    children.push(
      new Paragraph({
        text: 'Resumo Executivo',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 }
      })
    )

    const summaryItems = [
      `Período: ${data.summary.period}`,
      `Total de Afastamentos: ${data.summary.totalAbsences}`,
      `Total de Dias Perdidos: ${data.summary.totalDays}`,
      `Média de Dias por Afastamento: ${data.summary.averageDays.toFixed(1)}`,
      `Taxa de Absenteísmo: ${data.summary.absenteeismRate.toFixed(2)}%`
    ]

    summaryItems.forEach(item => {
      children.push(
        new Paragraph({
          text: `• ${item}`,
          spacing: { after: 100 },
          indent: { left: 360 }
        })
      )
    })

    children.push(
      new Paragraph({
        text: '',
        spacing: { after: 400 }
      })
    )
  }

  // Seções do relatório
  for (const section of data.sections) {
    children.push(
      new Paragraph({
        text: section.title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      })
    )

    if (section.type === 'text') {
      const content = Array.isArray(section.content)
        ? section.content
        : [section.content]

      content.forEach(paragraph => {
        children.push(
          new Paragraph({
            text: paragraph,
            spacing: { after: 200 },
            alignment: AlignmentType.JUSTIFIED
          })
        )
      })

    } else if (section.type === 'list' && Array.isArray(section.content)) {
      section.content.forEach(item => {
        children.push(
          new Paragraph({
            text: `• ${item}`,
            spacing: { after: 100 },
            indent: { left: 360 }
          })
        )
      })

      children.push(
        new Paragraph({
          text: '',
          spacing: { after: 200 }
        })
      )

    } else if (section.type === 'table' && section.data && section.data.length > 0) {
      const headers = Object.keys(section.data[0])
      
      // Criar células do cabeçalho
      const headerCells = headers.map(
        header =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: header,
                    bold: true
                  })
                ],
                alignment: AlignmentType.CENTER
              })
            ],
            shading: {
              fill: '3B82F6'
            }
          })
      )

      // Criar linhas de dados
      const dataRows = section.data.map(
        row =>
          new TableRow({
            children: headers.map(
              header =>
                new TableCell({
                  children: [
                    new Paragraph({
                      text: String(row[header] || ''),
                      alignment: AlignmentType.CENTER
                    })
                  ]
                })
            )
          })
      )

      // Adicionar tabela
      children.push(
        new Table({
          rows: [
            new TableRow({
              children: headerCells,
              tableHeader: true
            }),
            ...dataRows
          ],
          width: {
            size: 100,
            type: WidthType.PERCENTAGE
          },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
            insideVertical: { style: BorderStyle.SINGLE, size: 1 }
          }
        }),
        new Paragraph({
          text: '',
          spacing: { after: 400 }
        })
      )
    }
  }

  // Nota sobre gráficos
  if (data.charts && data.charts.length > 0) {
    children.push(
      new Paragraph({
        text: 'Gráficos e Visualizações',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 }
      }),
      new Paragraph({
        text: 'Os gráficos estão disponíveis no relatório em PDF ou na interface web do sistema.',
        italics: true,
        spacing: { after: 200 }
      })
    )
  }

  // Rodapé
  children.push(
    new Paragraph({
      text: '',
      spacing: { before: 800 }
    }),
    new Paragraph({
      text: '─'.repeat(80),
      spacing: { after: 200 }
    }),
    new Paragraph({
      text: 'Sistema de Análise de Absenteísmo',
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 }
    }),
    new Paragraph({
      text: new Date().toLocaleDateString('pt-BR'),
      alignment: AlignmentType.CENTER
    })
  )

  // Criar documento
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twips
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children
      }
    ]
  })

  // Gerar blob
  const blob = await Packer.toBlob(doc)
  return blob
}

export function downloadWord(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
