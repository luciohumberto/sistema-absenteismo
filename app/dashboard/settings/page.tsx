'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'integrations' | 'security'>('general')
  const [settings, setSettings] = useState({
    siteName: 'Sistema de Análise de Absenteísmo',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    dateFormat: 'DD/MM/YYYY',
    emailNotifications: true,
    weeklyReport: true,
    alertThreshold: 30,
    openaiEnabled: false,
    openaiKey: '',
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90
  })

  const handleSave = () => {
    alert('Configurações salvas com sucesso!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie as configurações do sistema
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-4">
          <button
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'general'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('general')}
          >
            Geral
          </button>
          <button
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'notifications'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notificações
          </button>
          <button
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'integrations'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('integrations')}
          >
            Integrações
          </button>
          <button
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'security'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Segurança
          </button>
        </nav>
      </div>

      {/* Configurações Gerais */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Configure informações gerais do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do Sistema</label>
                <Input
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Nome exibido no cabeçalho e documentos
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fuso Horário</label>
                <select
                  className="w-full h-10 px-3 rounded-md border bg-background"
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                >
                  <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                  <option value="America/Manaus">Manaus (GMT-4)</option>
                  <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
                  <option value="America/Noronha">Fernando de Noronha (GMT-2)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Idioma</label>
                <select
                  className="w-full h-10 px-3 rounded-md border bg-background"
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Formato de Data</label>
                <select
                  className="w-full h-10 px-3 rounded-md border bg-background"
                  value={settings.dateFormat}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferências de Análise</CardTitle>
              <CardDescription>Configure parâmetros de análise e alertas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Threshold de Alerta de Absenteísmo (%)
                </label>
                <Input
                  type="number"
                  value={settings.alertThreshold}
                  onChange={(e) => setSettings({ ...settings, alertThreshold: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  Percentual que dispara alertas automáticos
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Análise Automática de Padrões</div>
                  <p className="text-sm text-muted-foreground">
                    Detectar automaticamente tendências e anomalias
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Modo Escuro Automático</div>
                  <p className="text-sm text-muted-foreground">
                    Alternar tema baseado no horário do sistema
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notificações */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificações por Email</CardTitle>
              <CardDescription>Configure quais notificações você deseja receber</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Notificações de Sistema</div>
                  <p className="text-sm text-muted-foreground">
                    Alertas importantes, atualizações e manutenções
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Relatório Semanal</div>
                  <p className="text-sm text-muted-foreground">
                    Resumo semanal de métricas e insights (toda segunda-feira)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.weeklyReport}
                    onChange={(e) => setSettings({ ...settings, weeklyReport: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Alertas de Threshold</div>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando métricas ultrapassarem limites definidos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Novos Uploads</div>
                  <p className="text-sm text-muted-foreground">
                    Notificar quando novos dados forem carregados
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integrações */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>OpenAI / ChatGPT</CardTitle>
              <CardDescription>Configure a integração com IA para análises avançadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Assistente de IA Ativado</div>
                  <p className="text-sm text-muted-foreground">
                    Habilitar análises com inteligência artificial
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.openaiEnabled}
                    onChange={(e) => setSettings({ ...settings, openaiEnabled: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {settings.openaiEnabled && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">OpenAI API Key</label>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={settings.openaiKey}
                    onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Obtenha sua chave em{' '}
                    <a href="https://platform.openai.com/api-keys" target="_blank" className="text-primary hover:underline">
                      platform.openai.com/api-keys
                    </a>
                  </p>
                </div>
              )}

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  💡 Sobre o Assistente de IA
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  O assistente usa GPT-4 para gerar insights, identificar padrões complexos
                  e responder perguntas sobre seus dados em linguagem natural. Funciona
                  mesmo sem API key com respostas simuladas para demonstração.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outras Integrações</CardTitle>
              <CardDescription>Conecte com outras ferramentas e sistemas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                <div>
                  <div className="font-medium">Microsoft Teams</div>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificações e relatórios
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Em Breve
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                <div>
                  <div className="font-medium">Slack</div>
                  <p className="text-sm text-muted-foreground">
                    Integração com workspace
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Em Breve
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                <div>
                  <div className="font-medium">Google Drive</div>
                  <p className="text-sm text-muted-foreground">
                    Backup automático de relatórios
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Em Breve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Segurança */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
              <CardDescription>Configure opções de segurança e autenticação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Autenticação de Dois Fatores</div>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança com 2FA
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Timeout de Sessão (minutos)</label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  Tempo de inatividade antes de exigir novo login
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiração de Senha (dias)</label>
                <Input
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => setSettings({ ...settings, passwordExpiry: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">
                  Forçar troca de senha após este período (0 = nunca)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auditoria e Logs</CardTitle>
              <CardDescription>Monitoramento de atividades do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Log de Acessos</div>
                  <p className="text-sm text-muted-foreground">
                    Registrar todos os acessos ao sistema
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Log de Alterações</div>
                  <p className="text-sm text-muted-foreground">
                    Rastrear modificações em dados e configurações
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <Button variant="outline" className="w-full">
                Visualizar Logs de Auditoria
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup e Recuperação</CardTitle>
              <CardDescription>Proteção de dados e recuperação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Último Backup</div>
                  <span className="text-sm text-muted-foreground">Hoje, 03:00</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Backups automáticos são realizados diariamente às 03:00
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Baixar Backup
                  </Button>
                  <Button variant="outline" size="sm">
                    Restaurar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Botão Salvar */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave}>Salvar Configurações</Button>
      </div>
    </div>
  )
}
