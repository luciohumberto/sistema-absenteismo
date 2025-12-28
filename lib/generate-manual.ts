import puppeteer from 'puppeteer'
import { jsPDF } from 'jspdf'
import path from 'path'
import fs from 'fs'

interface Screenshot {
  name: string
  path: string
  description: string
}

interface ManualSection {
  title: string
  content: string
  screenshots: string[]
}

export async function generateProfessionalManual() {
  console.log('🚀 Iniciando geração de manual profissional com screenshots...')

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const screenshotsDir = path.join(process.cwd(), 'public', 'manual-screenshots')
  
  // Criar diretório de screenshots
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true })
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  })

  const page = await browser.newPage()
  
  // Fazer login
  console.log('🔐 Realizando login...')
  await page.goto(`${baseUrl}/auth/login`)
  await page.type('input[type="email"]', 'admin@sistema.com')
  await page.type('input[type="password"]', 'admin123')
  await page.click('button[type="submit"]')
  await page.waitForNavigation()

  const screenshots: Screenshot[] = []

  // Capturar screenshots de cada página
  const pagesToCapture = [
    {
      url: '/auth/login',
      name: '01-login',
      description: 'Tela de Login do Sistema',
      needsAuth: false
    },
    {
      url: '/dashboard',
      name: '02-dashboard-home',
      description: 'Dashboard Principal - Visão Geral'
    },
    {
      url: '/dashboard/upload',
      name: '03-upload',
      description: 'Página de Upload de Dados'
    },
    {
      url: '/dashboard/analytics',
      name: '04-dashboard-analytics',
      description: 'Dashboard de Analytics Completo'
    },
    {
      url: '/dashboard/temporal',
      name: '05-temporal',
      description: 'Análise Temporal de Absenteísmo'
    },
    {
      url: '/dashboard/cid-analysis',
      name: '06-cid-analysis',
      description: 'Análise Detalhada por CID'
    },
    {
      url: '/dashboard/patterns',
      name: '07-patterns',
      description: 'Detecção de Padrões e Alertas'
    },
    {
      url: '/dashboard/ai',
      name: '08-ai-assistant',
      description: 'Assistente de IA'
    },
    {
      url: '/dashboard/reports',
      name: '09-reports',
      description: 'Geração de Relatórios'
    },
    {
      url: '/dashboard/users',
      name: '10-users',
      description: 'Gerenciamento de Usuários'
    },
    {
      url: '/dashboard/settings',
      name: '11-settings',
      description: 'Configurações do Sistema'
    }
  ]

  for (const pageInfo of pagesToCapture) {
    try {
      console.log(`📸 Capturando: ${pageInfo.description}...`)
      
      if (!pageInfo.needsAuth) {
        // Abrir em nova aba anônima para login
        const loginPage = await browser.newPage()
        await loginPage.goto(`${baseUrl}${pageInfo.url}`)
        await loginPage.waitForTimeout(2000)
        
        const screenshotPath = path.join(screenshotsDir, `${pageInfo.name}.png`)
        await loginPage.screenshot({
          path: screenshotPath,
          fullPage: false
        })
        
        await loginPage.close()
      } else {
        await page.goto(`${baseUrl}${pageInfo.url}`)
        await page.waitForTimeout(3000) // Aguardar carregamento de gráficos
        
        const screenshotPath = path.join(screenshotsDir, `${pageInfo.name}.png`)
        await page.screenshot({
          path: screenshotPath,
          fullPage: false
        })
      }

      screenshots.push({
        name: pageInfo.name,
        path: `/manual-screenshots/${pageInfo.name}.png`,
        description: pageInfo.description
      })

      console.log(`✅ Capturado: ${pageInfo.name}.png`)
    } catch (error) {
      console.error(`❌ Erro ao capturar ${pageInfo.name}:`, error)
    }
  }

  await browser.close()

  console.log('📝 Gerando PDF profissional...')
  
  // Gerar HTML para conversão em PDF
  const htmlContent = generateManualHTML(screenshots)
  
  const htmlPath = path.join(process.cwd(), 'public', 'manual-profissional.html')
  fs.writeFileSync(htmlPath, htmlContent)

  console.log('✅ Manual HTML gerado em: /public/manual-profissional.html')
  console.log('📄 Abra no navegador e use "Imprimir > Salvar como PDF" para gerar o PDF final')
  console.log('💡 Ou acesse: http://localhost:3000/manual-profissional.html')

  return {
    htmlPath,
    screenshots
  }
}

function generateManualHTML(screenshots: Screenshot[]): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manual do Usuário - Sistema de Análise de Absenteísmo</title>
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
    }
    
    .cover {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      page-break-after: always;
      padding: 2rem;
    }
    
    .cover h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .cover h2 {
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: 3rem;
    }
    
    .cover .version {
      font-size: 1rem;
      opacity: 0.9;
      margin-top: 2rem;
    }
    
    .toc {
      page-break-after: always;
      padding: 2rem;
    }
    
    .toc h2 {
      font-size: 2rem;
      color: #667eea;
      margin-bottom: 2rem;
      border-bottom: 3px solid #667eea;
      padding-bottom: 0.5rem;
    }
    
    .toc ul {
      list-style: none;
    }
    
    .toc li {
      margin: 0.5rem 0;
      padding-left: 1rem;
    }
    
    .toc a {
      color: #333;
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    
    .toc a:hover {
      background: #f0f0f0;
    }
    
    .section {
      page-break-before: always;
      padding: 2rem;
    }
    
    .section h2 {
      font-size: 2rem;
      color: #667eea;
      margin-bottom: 1.5rem;
      border-bottom: 3px solid #667eea;
      padding-bottom: 0.5rem;
    }
    
    .section h3 {
      font-size: 1.5rem;
      color: #764ba2;
      margin: 2rem 0 1rem;
    }
    
    .section h4 {
      font-size: 1.2rem;
      color: #555;
      margin: 1.5rem 0 0.8rem;
    }
    
    .section p {
      margin-bottom: 1rem;
      text-align: justify;
    }
    
    .screenshot {
      margin: 2rem 0;
      page-break-inside: avoid;
    }
    
    .screenshot img {
      width: 100%;
      border: 2px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .screenshot-caption {
      text-align: center;
      font-style: italic;
      color: #666;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
    
    .info-box {
      background: #e3f2fd;
      border-left: 4px solid #2196f3;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
      page-break-inside: avoid;
    }
    
    .info-box.warning {
      background: #fff3e0;
      border-left-color: #ff9800;
    }
    
    .info-box.success {
      background: #e8f5e9;
      border-left-color: #4caf50;
    }
    
    .info-box h5 {
      margin-bottom: 0.5rem;
      color: #2196f3;
    }
    
    .info-box.warning h5 {
      color: #ff9800;
    }
    
    .info-box.success h5 {
      color: #4caf50;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      page-break-inside: avoid;
    }
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border: 1px solid #ddd;
    }
    
    th {
      background: #667eea;
      color: white;
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background: #f9f9f9;
    }
    
    .step-list {
      counter-reset: step-counter;
      list-style: none;
      padding-left: 0;
    }
    
    .step-list li {
      counter-increment: step-counter;
      margin: 1rem 0;
      padding-left: 3rem;
      position: relative;
    }
    
    .step-list li::before {
      content: counter(step-counter);
      position: absolute;
      left: 0;
      top: 0;
      background: #667eea;
      color: white;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    
    .footer {
      position: fixed;
      bottom: 1cm;
      left: 2cm;
      right: 2cm;
      text-align: center;
      font-size: 0.8rem;
      color: #666;
      border-top: 1px solid #ddd;
      padding-top: 0.5rem;
    }
    
    @media print {
      .no-print {
        display: none;
      }
      
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <!-- CAPA -->
  <div class="cover">
    <h1>📊 Manual do Usuário</h1>
    <h2>Sistema de Análise de Absenteísmo-Doença</h2>
    <div style="font-size: 1.2rem; margin: 2rem 0;">
      Sistema WEB Completo para o Setor Público
    </div>
    <div class="version">
      Versão 1.0 | Dezembro 2024<br>
      Sistema Hospedado Online
    </div>
  </div>

  <!-- ÍNDICE -->
  <div class="toc">
    <h2>📋 Índice</h2>
    <ul>
      <li><a href="#intro"><span>1. Introdução</span><span>3</span></a></li>
      <li><a href="#acesso"><span>2. Acesso ao Sistema</span><span>4</span></a></li>
      <li><a href="#interface"><span>3. Interface Principal</span><span>5</span></a></li>
      <li><a href="#perfis"><span>4. Perfis de Usuário</span><span>6</span></a></li>
      <li><a href="#upload"><span>5. Upload de Dados</span><span>7</span></a></li>
      <li><a href="#dashboards"><span>6. Dashboards e Análises</span><span>8</span></a></li>
      <li><a href="#ai"><span>7. Assistente de IA</span><span>12</span></a></li>
      <li><a href="#relatorios"><span>8. Geração de Relatórios</span><span>13</span></a></li>
      <li><a href="#usuarios"><span>9. Gerenciamento de Usuários</span><span>14</span></a></li>
      <li><a href="#faq"><span>10. Perguntas Frequentes</span><span>15</span></a></li>
    </ul>
  </div>

  <!-- SEÇÃO 1: INTRODUÇÃO -->
  <div class="section" id="intro">
    <h2>1. Introdução</h2>
    
    <h3>1.1 Sobre o Sistema</h3>
    <p>
      O <strong>Sistema de Análise de Absenteísmo-Doença</strong> é uma aplicação WEB hospedada 
      na nuvem, desenvolvida especificamente para o setor público brasileiro. O sistema permite 
      analisar, monitorar e gerar insights inteligentes sobre afastamentos de servidores por 
      motivo de saúde.
    </p>

    <div class="info-box success">
      <h5>✅ Características Principais</h5>
      <ul>
        <li><strong>100% Online</strong> - Acesso via navegador, sem instalação</li>
        <li><strong>Análise Inteligente com IA</strong> - Insights automáticos e contextualizados</li>
        <li><strong>Dashboards Interativos</strong> - Visualizações dinâmicas com controles avançados</li>
        <li><strong>Upload Simplificado</strong> - Suporte a arquivos até 120MB</li>
        <li><strong>Controle de Acesso Granular</strong> - Por secretaria e nível de permissão</li>
        <li><strong>Relatórios Profissionais</strong> - Exportação em PDF, Word e Excel</li>
      </ul>
    </div>

    <h3>1.2 Requisitos de Acesso</h3>
    <table>
      <tr>
        <th>Requisito</th>
        <th>Especificação</th>
      </tr>
      <tr>
        <td>Navegador</td>
        <td>Chrome 90+, Firefox 88+, Edge 90+, Safari 14+</td>
      </tr>
      <tr>
        <td>Conexão</td>
        <td>Internet banda larga (mínimo 1 Mbps)</td>
      </tr>
      <tr>
        <td>Resolução</td>
        <td>Mínimo 1280x720 (recomendado: 1920x1080)</td>
      </tr>
      <tr>
        <td>Credenciais</td>
        <td>Login e senha fornecidos pelo administrador</td>
      </tr>
    </table>
  </div>

  <!-- SEÇÃO 2: ACESSO AO SISTEMA -->
  <div class="section" id="acesso">
    <h2>2. Acesso ao Sistema</h2>
    
    <h3>2.1 Tela de Login</h3>
    <p>
      Para acessar o sistema, abra seu navegador e digite o endereço fornecido pelo 
      administrador. A tela de login será apresentada.
    </p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '01-login')?.path}" alt="Tela de Login">
      <p class="screenshot-caption">Figura 1: Tela de Login do Sistema</p>
    </div>

    <h3>2.2 Como Fazer Login</h3>
    <ol class="step-list">
      <li>Digite seu <strong>e-mail</strong> no campo indicado</li>
      <li>Digite sua <strong>senha</strong> no campo de senha</li>
      <li>Clique no botão <strong>"Entrar"</strong></li>
      <li>Você será redirecionado para o dashboard principal</li>
    </ol>

    <div class="info-box">
      <h5>💡 Dica</h5>
      <p>Use o alternador de tema (ícone ☀️/🌙) no canto superior direito para alternar entre modo claro e escuro.</p>
    </div>

    <div class="info-box warning">
      <h5>⚠️ Esqueci Minha Senha</h5>
      <p>Clique em "Esqueci minha senha" na tela de login, digite seu e-mail e siga as instruções recebidas por e-mail.</p>
    </div>
  </div>

  <!-- SEÇÃO 3: DASHBOARD HOME -->
  <div class="section" id="interface">
    <h2>3. Dashboard Principal</h2>
    
    <p>
      Após o login, você será direcionado para o dashboard principal, que apresenta uma 
      visão geral dos principais indicadores de absenteísmo.
    </p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '02-dashboard-home')?.path}" alt="Dashboard Principal">
      <p class="screenshot-caption">Figura 2: Dashboard Principal - Visão Geral</p>
    </div>

    <h3>3.1 Estrutura da Interface</h3>
    <h4>A. Barra Superior</h4>
    <ul>
      <li>Logo e título do sistema</li>
      <li>Alternador de tema (claro/escuro)</li>
      <li>Notificações</li>
      <li>Menu do usuário (perfil, sair)</li>
    </ul>

    <h4>B. Menu Lateral</h4>
    <ul>
      <li>🏠 <strong>Home</strong> - Dashboard resumido</li>
      <li>📤 <strong>Upload</strong> - Carregar dados</li>
      <li>📊 <strong>Dashboards</strong> - Análises gerais</li>
      <li>🏥 <strong>Análise CID</strong> - Por doença</li>
      <li>📅 <strong>Temporal</strong> - Ao longo do tempo</li>
      <li>🔍 <strong>Padrões</strong> - Detecção inteligente</li>
      <li>🤖 <strong>IA</strong> - Assistente inteligente</li>
      <li>📄 <strong>Relatórios</strong> - Documentos</li>
      <li>👥 <strong>Usuários</strong> - Gerenciamento</li>
      <li>⚙️ <strong>Configurações</strong> - Preferências</li>
    </ul>
  </div>

  <!-- SEÇÃO 4: PERFIS -->
  <div class="section" id="perfis">
    <h2>4. Perfis de Usuário</h2>
    
    <p>O sistema possui 4 níveis de acesso com permissões diferentes:</p>

    <h3>4.1 Administrador 🔴</h3>
    <ul>
      <li>✅ Acesso total ao sistema</li>
      <li>✅ Gerenciar usuários e definir permissões</li>
      <li>✅ Configurar acesso por secretaria</li>
      <li>✅ Upload de dados e visualização completa</li>
      <li>✅ Gerar todos os tipos de relatórios</li>
      <li>✅ Acessar logs de auditoria</li>
    </ul>

    <h3>4.2 Gestor 🔵</h3>
    <ul>
      <li>✅ Upload de dados</li>
      <li>✅ Visualizar dashboards</li>
      <li>✅ Gerar relatórios executivos</li>
      <li>✅ Usar assistente de IA</li>
      <li>✅ Acesso limitado às secretarias definidas pelo admin</li>
      <li>❌ Não pode gerenciar usuários</li>
    </ul>

    <h3>4.3 Analista 🟢</h3>
    <ul>
      <li>✅ Visualizar dashboards</li>
      <li>✅ Usar assistente de IA</li>
      <li>✅ Gerar relatórios básicos</li>
      <li>✅ Acesso limitado às secretarias definidas</li>
      <li>❌ Não pode fazer upload</li>
    </ul>

    <h3>4.4 Visualizador ⚪</h3>
    <ul>
      <li>✅ Apenas visualização</li>
      <li>✅ Acesso limitado às secretarias definidas</li>
      <li>❌ Não pode exportar ou modificar</li>
    </ul>

    <div class="info-box">
      <h5>🔒 Controle de Acesso por Secretaria</h5>
      <p>
        O <strong>Administrador</strong> define quais secretarias cada usuário pode visualizar. 
        Se nenhuma secretaria for especificada, o usuário terá acesso a todos os dados. 
        Caso contrário, verá apenas dados das secretarias autorizadas.
      </p>
    </div>
  </div>

  <!-- SEÇÃO 5: UPLOAD -->
  <div class="section" id="upload">
    <h2>5. Upload de Dados</h2>
    
    <p>
      A página de upload permite carregar planilhas Excel ou arquivos CSV com dados de 
      afastamento. O sistema suporta arquivos de até <strong>120 MB</strong>.
    </p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '03-upload')?.path}" alt="Upload de Dados">
      <p class="screenshot-caption">Figura 3: Página de Upload de Dados</p>
    </div>

    <h3>5.1 Formatos Aceitos</h3>
    <table>
      <tr>
        <th>Formato</th>
        <th>Extensões</th>
        <th>Tamanho Máximo</th>
      </tr>
      <tr>
        <td>Excel</td>
        <td>.xls, .xlsx, .xlsb</td>
        <td rowspan="3">120 MB</td>
      </tr>
      <tr>
        <td>CSV</td>
        <td>.csv</td>
      </tr>
      <tr>
        <td>SQL</td>
        <td>.sql</td>
      </tr>
    </table>

    <h3>5.2 Colunas Obrigatórias</h3>
    <ul>
      <li><strong>Matrícula</strong> - Código do servidor</li>
      <li><strong>CID</strong> - Código CID-10 da doença</li>
      <li><strong>Data Início</strong> - Data do afastamento</li>
      <li><strong>Data Fim</strong> - Data do retorno</li>
    </ul>

    <h3>5.3 Como Fazer Upload</h3>
    <ol class="step-list">
      <li><strong>Arraste e solte</strong> o arquivo na área indicada ou clique em "Selecionar Arquivo"</li>
      <li>O sistema detecta automaticamente as colunas</li>
      <li>Clique em <strong>"Processar Arquivo"</strong></li>
      <li>Aguarde o processamento (barra de progresso)</li>
      <li>Receba confirmação de sucesso</li>
    </ol>

    <div class="info-box success">
      <h5>✅ Mapeamento Automático</h5>
      <p>
        O sistema detecta automaticamente variações nos nomes das colunas. Por exemplo, 
        aceita "matrícula", "matricula", "código", "id" para o campo de matrícula.
      </p>
    </div>
  </div>

  <!-- SEÇÃO 6: DASHBOARDS -->
  <div class="section" id="dashboards">
    <h2>6. Dashboards e Análises</h2>
    
    <h3>6.1 Dashboard de Analytics</h3>
    <p>
      Apresenta análises completas com gráficos interativos, permitindo alternar entre 
      tipos de visualização, adicionar linhas de tendência e definir metas.
    </p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '04-dashboard-analytics')?.path}" alt="Dashboard Analytics">
      <p class="screenshot-caption">Figura 4: Dashboard de Analytics com Gráficos Interativos</p>
    </div>

    <div class="info-box">
      <h5>🎛️ Controles Interativos</h5>
      <p>Cada gráfico possui controles para:</p>
      <ul>
        <li><strong>Alternar tipo</strong>: Linha, Barras, Pizza, Rosca</li>
        <li><strong>Linha de Tendência (📈)</strong>: Visualizar tendências com regressão linear</li>
        <li><strong>Linha de Meta (🎯)</strong>: Definir e visualizar metas</li>
        <li><strong>Exportar</strong>: Salvar gráfico como imagem PNG</li>
      </ul>
    </div>

    <h3>6.2 Análise Temporal</h3>
    <p>Identifica padrões ao longo do tempo, sazonalidade e tendências.</p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '05-temporal')?.path}" alt="Análise Temporal">
      <p class="screenshot-caption">Figura 5: Análise Temporal de Absenteísmo</p>
    </div>

    <h3>6.3 Análise por CID</h3>
    <p>Detalhamento das causas de afastamento organizadas pela CID-10.</p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '06-cid-analysis')?.path}" alt="Análise CID">
      <p class="screenshot-caption">Figura 6: Análise Detalhada por CID</p>
    </div>

    <h3>6.4 Detecção de Padrões</h3>
    <p>Identifica automaticamente padrões como "Síndrome da Segunda-feira" e recorrências.</p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '07-patterns')?.path}" alt="Padrões">
      <p class="screenshot-caption">Figura 7: Detecção Inteligente de Padrões</p>
    </div>

    <div class="info-box success">
      <h5>🤖 Análise com IA</h5>
      <p>
        Cada dashboard possui duas seções geradas por Inteligência Artificial:
      </p>
      <ul>
        <li><strong>Introdução</strong> (topo): Explica o dashboard e como usar</li>
        <li><strong>Análise Inteligente</strong> (final): Insights, alertas e recomendações</li>
      </ul>
    </div>
  </div>

  <!-- SEÇÃO 7: ASSISTENTE IA -->
  <div class="section" id="ai">
    <h2>7. Assistente de IA</h2>
    
    <p>
      O Assistente de IA responde perguntas sobre seus dados em linguagem natural, 
      utilizando GPT-4 para análises contextualizadas.
    </p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '08-ai-assistant')?.path}" alt="Assistente IA">
      <p class="screenshot-caption">Figura 8: Assistente de IA com Chat Interativo</p>
    </div>

    <h3>7.1 Exemplos de Perguntas</h3>
    <ul>
      <li>"Qual a principal causa de afastamento na Secretaria de Educação?"</li>
      <li>"Existe correlação entre idade e tipo de CID?"</li>
      <li>"Compare janeiro e dezembro deste ano"</li>
      <li>"Quantos servidores tiveram mais de 3 afastamentos?"</li>
    </ul>

    <h3>7.2 Perguntas Sugeridas</h3>
    <p>O sistema oferece templates prontos para facilitar:</p>
    <ul>
      <li>📈 Análise de Tendências</li>
      <li>🏢 Comparação Departamental</li>
      <li>🔍 Identificação de Padrões</li>
      <li>📄 Geração de Relatório Executivo</li>
    </ul>
  </div>

  <!-- SEÇÃO 8: RELATÓRIOS -->
  <div class="section" id="relatorios">
    <h2>8. Geração de Relatórios</h2>
    
    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '09-reports')?.path}" alt="Relatórios">
      <p class="screenshot-caption">Figura 9: Interface de Geração de Relatórios</p>
    </div>

    <h3>8.1 Tipos de Relatórios</h3>
    
    <h4>1. Relatório Executivo 📊</h4>
    <ul>
      <li><strong>Para:</strong> Diretores, alta gestão</li>
      <li><strong>Conteúdo:</strong> Resumo executivo, KPIs, top insights</li>
      <li><strong>Formato:</strong> PDF profissional (4-6 páginas)</li>
    </ul>

    <h4>2. Relatório Técnico 📋</h4>
    <ul>
      <li><strong>Para:</strong> Analistas, RH, saúde ocupacional</li>
      <li><strong>Conteúdo:</strong> Análise detalhada, tabelas, metodologia</li>
      <li><strong>Formato:</strong> PDF técnico (15-25 páginas)</li>
    </ul>

    <h4>3. Dashboard Snapshot 📸</h4>
    <ul>
      <li><strong>Para:</strong> Compartilhamento rápido</li>
      <li><strong>Conteúdo:</strong> Imagem dos gráficos principais</li>
      <li><strong>Formato:</strong> PDF ou PNG (1-2 páginas)</li>
    </ul>

    <h4>4. Relatório Personalizado ⚙️</h4>
    <ul>
      <li><strong>Para:</strong> Usuários avançados</li>
      <li><strong>Conteúdo:</strong> Customizável por seção</li>
      <li><strong>Formato:</strong> PDF, Word ou Excel</li>
    </ul>

    <h3>8.2 Como Gerar</h3>
    <ol class="step-list">
      <li>Acesse <strong>Menu > Relatórios</strong></li>
      <li>Escolha o tipo de relatório</li>
      <li>Configure filtros (período, departamentos)</li>
      <li>Clique em <strong>"Gerar Relatório"</strong></li>
      <li>Aguarde processamento</li>
      <li>Download automático ou visualização prévia</li>
    </ol>
  </div>

  <!-- SEÇÃO 9: USUÁRIOS -->
  <div class="section" id="usuarios">
    <h2>9. Gerenciamento de Usuários</h2>
    
    <p><strong>Disponível apenas para Administradores</strong></p>

    <div class="screenshot">
      <img src="${screenshots.find(s => s.name === '10-users')?.path}" alt="Gerenciamento Usuários">
      <p class="screenshot-caption">Figura 10: Gerenciamento de Usuários</p>
    </div>

    <h3>9.1 Criar Novo Usuário</h3>
    <ol class="step-list">
      <li>Clique em <strong>"Novo Usuário"</strong></li>
      <li>Preencha: Nome, E-mail, Perfil</li>
      <li>Defina as <strong>Secretarias Autorizadas</strong></li>
      <li>Salve e envie credenciais</li>
    </ol>

    <div class="info-box">
      <h5>🔐 Controle Granular de Acesso</h5>
      <p>
        Ao criar um usuário, o administrador pode:
      </p>
      <ul>
        <li><strong>Deixar vazio</strong>: Usuário vê TODAS as secretarias</li>
        <li><strong>Selecionar específicas</strong>: Usuário vê apenas secretarias autorizadas</li>
      </ul>
      <p>
        Exemplo: Um gestor da "Secretaria de Saúde" só verá dados da Saúde. 
        Já um diretor geral pode ver todas as secretarias.
      </p>
    </div>

    <h3>9.2 Editar Permissões</h3>
    <p>
      Clique em "Editar" ao lado do usuário para alterar perfil ou secretarias autorizadas. 
      As alterações são aplicadas imediatamente.
    </p>
  </div>

  <!-- SEÇÃO 10: FAQ -->
  <div class="section" id="faq">
    <h2>10. Perguntas Frequentes</h2>
    
    <h3>Upload e Dados</h3>
    
    <h4>P: Qual o tamanho máximo do arquivo?</h4>
    <p><strong>R:</strong> 120 MB por arquivo.</p>

    <h4>P: Posso enviar dados de anos anteriores?</h4>
    <p><strong>R:</strong> Sim, sem restrição de período histórico.</p>

    <h4>P: O sistema detecta dados duplicados?</h4>
    <p><strong>R:</strong> Sim, e oferece opção de pular ou substituir.</p>

    <h3>Dashboards e Gráficos</h3>
    
    <h4>P: Posso alterar o tipo de gráfico?</h4>
    <p><strong>R:</strong> Sim! Use os botões de controle para alternar entre linha, barras, pizza e rosca.</p>

    <h4>P: Como ativo a linha de tendência?</h4>
    <p><strong>R:</strong> Clique no botão 📈 acima do gráfico.</p>

    <h4>P: Como defino uma meta?</h4>
    <p><strong>R:</strong> Clique no botão 🎯, digite o valor da meta e clique em "Aplicar".</p>

    <h4>P: Os gráficos são exportáveis?</h4>
    <p><strong>R:</strong> Sim, clique no botão de download para salvar como PNG.</p>

    <h3>Controle de Acesso</h3>
    
    <h4>P: Como limitar acesso por secretaria?</h4>
    <p><strong>R:</strong> No gerenciamento de usuários, selecione as secretarias autorizadas ao criar/editar um usuário.</p>

    <h4>P: Um usuário pode ver múltiplas secretarias?</h4>
    <p><strong>R:</strong> Sim, selecione todas as secretarias desejadas.</p>

    <h4>P: Como dar acesso total?</h4>
    <p><strong>R:</strong> Deixe o campo de secretarias vazio.</p>

    <h3>Assistente de IA</h3>
    
    <h4>P: A IA tem acesso aos meus dados?</h4>
    <p><strong>R:</strong> Sim, mas apenas aos dados do seu sistema. Não compartilha externamente.</p>

    <h4>P: As análises da IA são sempre corretas?</h4>
    <p><strong>R:</strong> São altamente precisas, mas sempre revise informações críticas.</p>

    <h3>Relatórios</h3>
    
    <h4>P: Quanto tempo leva para gerar?</h4>
    <p><strong>R:</strong> De 5 a 40 segundos dependendo do tipo.</p>

    <h4>P: Posso agendar relatórios automáticos?</h4>
    <p><strong>R:</strong> Sim, perfis Gestor e Administrador podem agendar.</p>
  </div>

  <!-- CONTATO -->
  <div class="section">
    <h2>📞 Suporte e Contato</h2>
    
    <table>
      <tr>
        <th>Canal</th>
        <th>Informação</th>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>suporte@sistema-absenteismo.com</td>
      </tr>
      <tr>
        <td>Telefone</td>
        <td>(61) 3000-0000</td>
      </tr>
      <tr>
        <td>Horário</td>
        <td>Segunda a sexta, 8h às 18h</td>
      </tr>
      <tr>
        <td>Chat Online</td>
        <td>Ícone 💬 no canto inferior direito</td>
      </tr>
    </table>

    <div style="margin-top: 3rem; text-align: center; color: #666;">
      <p><strong>Sistema de Análise de Absenteísmo-Doença</strong></p>
      <p>Versão 1.0 | Dezembro 2024</p>
      <p>© 2024 - Todos os direitos reservados</p>
    </div>
  </div>

  <div class="footer no-print">
    Sistema de Análise de Absenteísmo | Manual do Usuário v1.0
  </div>
</body>
</html>
  `
}

// Executar se chamado diretamente
if (require.main === module) {
  generateProfessionalManual()
    .then(() => {
      console.log('✅ Manual gerado com sucesso!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Erro:', error)
      process.exit(1)
    })
}
