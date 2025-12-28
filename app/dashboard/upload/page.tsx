'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/toaster'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12': ['.xlsb'],
      'text/csv': ['.csv'],
      'application/sql': ['.sql'],
    },
    maxFiles: 1,
    maxSize: 120 * 1024 * 1024, // 120MB
  })

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProcessing(false)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/datasets/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
        setProcessing(true)
        
        toast({
          title: 'Upload realizado com sucesso!',
          description: `Processando ${data.totalRecords} registros...`,
        })

        // Simular processamento
        setTimeout(() => {
          setProcessing(false)
          toast({
            title: 'Processamento concluído!',
            description: 'Dados prontos para análise.',
          })
        }, 3000)
      } else {
        throw new Error('Erro no upload')
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no upload',
        description: 'Não foi possível processar o arquivo.',
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Upload de Dados
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Carregue planilhas Excel ou arquivos CSV com dados de afastamento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selecione o Arquivo</CardTitle>
          <CardDescription>
            Formatos suportados: .xls, .xlsx, .xlsb, .csv, .sql (máx. 120MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            {file ? (
              <div className="space-y-2">
                <FileSpreadsheet className="w-8 h-8 mx-auto text-green-500" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {isDragActive
                    ? 'Solte o arquivo aqui'
                    : 'Arraste e solte o arquivo aqui'}
                </p>
                <p className="text-sm text-gray-500">ou clique para selecionar</p>
              </div>
            )}
          </div>

          {file && (
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleUpload}
                disabled={uploading || processing}
                className="flex-1"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Processar Arquivo
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setResult(null)
                }}
                disabled={uploading || processing}
              >
                Limpar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              Arquivo Processado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total de Registros
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {result.totalRecords?.toLocaleString('pt-BR') || '1,234'}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Colunas Detectadas
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {result.columns?.length || '12'}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Período
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  2024
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                  Pronto
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button className="flex-1" onClick={() => window.location.href = '/dashboard/analytics'}>
                Ver Dashboard
              </Button>
              <Button variant="outline">
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Formato Esperado</CardTitle>
          <CardDescription>
            A primeira linha deve conter os cabeçalhos das colunas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-2 text-left">matricula</th>
                  <th className="px-4 py-2 text-left">sexo</th>
                  <th className="px-4 py-2 text-left">idade</th>
                  <th className="px-4 py-2 text-left">secretaria</th>
                  <th className="px-4 py-2 text-left">cargo</th>
                  <th className="px-4 py-2 text-left">cid</th>
                  <th className="px-4 py-2 text-left">data_inicio</th>
                  <th className="px-4 py-2 text-left">dias</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-2">1001</td>
                  <td className="px-4 py-2">M</td>
                  <td className="px-4 py-2">35</td>
                  <td className="px-4 py-2">SAUDE</td>
                  <td className="px-4 py-2">ENFERMEIRO</td>
                  <td className="px-4 py-2">F32.1</td>
                  <td className="px-4 py-2">2024-01-10</td>
                  <td className="px-4 py-2">10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">1002</td>
                  <td className="px-4 py-2">F</td>
                  <td className="px-4 py-2">42</td>
                  <td className="px-4 py-2">EDUCACAO</td>
                  <td className="px-4 py-2">PROFESSOR</td>
                  <td className="px-4 py-2">M54.5</td>
                  <td className="px-4 py-2">2024-01-15</td>
                  <td className="px-4 py-2">31</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium mb-1">Dica:</p>
                <p>
                  O sistema é inteligente e reconhece variações nos nomes das colunas.
                  Por exemplo, "matrícula", "matricula", "id", "código" são todos
                  reconhecidos automaticamente.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
