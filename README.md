# 📊 Sistema de Análise de Absenteísmo-Doença

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-production%20ready-success.svg)

> **🚀 Sistema 100% pronto para rodar na WEB - Sem necessidade de programação!**

Sistema web completo e inteligente para análise de absenteísmo-doença no setor público, com dashboards interativos, análises automatizadas por IA e geração de relatórios profissionais.

---

## ⚡ DEPLOY RÁPIDO (5 minutos)

### Para colocar o sistema ONLINE na web:

```powershell
# Execute este comando:
.\deploy-automatico.bat
```

**Após 5 minutos você terá:**
- ✅ Sistema rodando na web (não localhost)
- ✅ URL pública: `https://seu-sistema.vercel.app`
- ✅ Banco de dados PostgreSQL na nuvem
- ✅ HTTPS automático
- ✅ Tudo 100% GRATUITO

### 📖 Guias Disponíveis:
- **[DEPLOY_COMPLETO.md](DEPLOY_COMPLETO.md)** - Tutorial detalhado passo-a-passo
- **[deploy-automatico.bat](deploy-automatico.bat)** - Script de deploy automático
- **[MANUAL_USUARIO_WEB.md](docs/MANUAL_USUARIO_WEB.md)** - Manual do usuário

### 🎯 Requisitos Mínimos:
1. **Conta Vercel** (gratuita via GitHub): https://vercel.com
2. **Banco PostgreSQL** (gratuito):
   - Neon: https://neon.tech
   - Supabase: https://supabase.com

### 👤 Credenciais Padrão (após deploy):
- **Email:** `admin@sistema.com`
- **Senha:** `Admin@123`

---

## ✨ Características Principais

### 🎯 Funcionalidades Core
- **Upload Inteligente**: Suporte a Excel (.xls, .xlsx, .xlsb), CSV e SQL
- **Mapeamento Automático**: Interpretação automática de colunas sem configuração manual
- **Banco de Dados Robusto**: PostgreSQL com Prisma ORM
- **Dashboards Interativos**: Visualizações profissionais e responsivas
- **Análise por IA**: Geração automática de insights e relatórios técnicos
- **Exportação Multi-formato**: PDF, Word, Excel e impressão

### 📈 Módulos de Análise

#### 1. Visão Geral
- Total de afastamentos
- Total de dias afastados
- Média de dias por afastamento
- Tendências temporais

#### 2. Análise Temporal
- Evolução mensal e anual
- Padrões por dia da semana
- Análise de sazonalidade
- Detecção de picos anormais

#### 3. Análise Demográfica
- Comparação por sexo
- Distribuição por faixa etária
- Análise por secretaria/departamento
- Análise por cargo e vínculo

#### 4. Análise por CID
- CIDs mais recorrentes
- Agrupamento por capítulo (F, M, J, etc.)
- Análise por grupo de doenças
- Categorização automática:
  - Transtornos mentais
  - Doenças musculoesqueléticas
  - Doenças respiratórias
  - E mais...

#### 5. Módulo de Absenteísmo-Doença
- **Reincidência**: Identificação de servidores com múltiplos afastamentos
- **Afastamentos Prolongados**: Análise de casos > 15 dias
- **Padrões Temporais**: Detecção de ausências em segundas-feiras, vésperas de feriados
- **Alertas Inteligentes**: Identificação de situações críticas

#### 6. Inteligência Artificial
- Análises textuais interpretativas automáticas
- Geração de relatórios técnicos profissionais
- Perguntas em linguagem natural sobre os dados
- Recomendações baseadas em padrões identificados
- Previsões e tendências

### 🎨 Interface Moderna

- **Design Profissional**: UI elegante e intuitiva
- **Tema Claro/Escuro**: Alternância automática ou manual
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Filtros Dinâmicos**: Filtragem em tempo real
- **Gráficos Interativos**: Hover, zoom, exportação
- **Animações Suaves**: Transições elegantes

### 🔒 Segurança e Privacidade

- **Autenticação Segura**: Sistema robusto de login
- **Controle de Acesso**: 4 níveis de permissão:
  - 👑 **ADMIN**: Acesso completo ao sistema
  - 👔 **MANAGER**: Gestão de dados e relatórios
  - 📊 **ANALYST**: Análises e visualizações
  - 👀 **VIEWER**: Apenas leitura
- **Dados Anonimizados**: Proteção de informações sensíveis
- **Criptografia**: Senhas hash com bcrypt
- **Sessões Seguras**: Cookies HTTP-only

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- PostgreSQL (pode usar serviços gratuitos como Vercel Postgres, Supabase, Neon)
- Conta na OpenAI (para funcionalidades de IA)
- Conta no GitHub/Vercel (para deploy)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/sistema-absenteismo.git
cd sistema-absenteismo
```

### Passo 2: Instalar Dependências

```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database (escolha uma opção gratuita)
# Vercel Postgres:
DATABASE_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"

# Supabase:
# DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"

# Neon:
# DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]"

# NextAuth
NEXTAUTH_URL="https://seu-dominio.vercel.app"
NEXTAUTH_SECRET="gere-um-secret-aleatorio-aqui"

# OpenAI (para análises de IA)
OPENAI_API_KEY="sk-sua-chave-aqui"
```

### Passo 4: Configurar Banco de Dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco de dados
npx prisma db push

# (Opcional) Popular com dados de exemplo
npx prisma db seed
```

### Passo 5: Criar Usuário Administrador

Execute o script de seed ou crie manualmente via Prisma Studio:

```bash
npx prisma studio
```

Ou use o script SQL:

```sql
INSERT INTO users (id, name, email, password, role) 
VALUES (
  'admin-id',
  'Administrador',
  'admin@sistema.com',
  '$2a$10$YourHashedPasswordHere', -- senha: admin123
  'ADMIN'
);
```

### Passo 6: Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy na Vercel (Grátis)

### Deploy Automático

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente
6. Clique em "Deploy"

### Configuração do Banco de Dados na Vercel

#### Opção 1: Vercel Postgres (Recomendado)

```bash
# Instalar CLI da Vercel
npm i -g vercel

# Fazer login
vercel login

# Criar banco Postgres
vercel postgres create

# Conectar ao projeto
vercel link
```

#### Opção 2: Supabase (Grátis)

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Copie a connection string
4. Adicione em Environment Variables na Vercel

#### Opção 3: Neon (Grátis)

1. Acesse [neon.tech](https://neon.tech)
2. Crie um novo projeto
3. Copie a connection string
4. Adicione em Environment Variables na Vercel

### Variáveis de Ambiente na Vercel

No painel da Vercel, vá em Settings → Environment Variables e adicione:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `OPENAI_API_KEY`

## 📖 Manual de Uso

### Para Administradores

#### 1. Primeiro Acesso
- Acesse o sistema com credenciais de administrador
- Configure perfis de usuários
- Defina permissões de acesso

#### 2. Gerenciamento de Usuários
- **Criar Usuário**: Dashboard → Usuários → Novo Usuário
- **Atribuir Função**: Escolha entre ADMIN, MANAGER, ANALYST ou VIEWER
- **Gerenciar Permissões**: Configure acesso a módulos específicos

#### 3. Configurações do Sistema
- **Tema**: Claro/Escuro/Automático
- **Notificações**: Configure alertas
- **Backup**: Configurar backup automático

### Para Gestores e Analistas

#### 1. Upload de Dados

**Formatos Suportados:**
- Excel: `.xls`, `.xlsx`, `.xlsb`
- CSV: `.csv`
- SQL: Arquivos `.sql` com dumps

**Processo de Upload:**

1. Clique em "📤 Novo Dataset" no dashboard
2. Selecione o arquivo ou arraste para a área de upload
3. O sistema automaticamente:
   - Detecta o formato
   - Lê a primeira linha como cabeçalho
   - Mapeia as colunas
   - Valida os dados
4. Revise o mapeamento automático (geralmente 100% correto)
5. Clique em "Processar Dados"
6. Aguarde o processamento (mostra progresso em tempo real)

**Colunas Esperadas** (nomes flexíveis):
- Matrícula / ID / Código (anonimizado)
- Sexo / Gênero (M/F)
- Idade / Data Nascimento
- Secretaria / Departamento / Órgão
- Cargo / Função
- Vínculo / Tipo Contrato
- CID / Código CID
- Data Início / Início Afastamento
- Data Fim / Fim Afastamento (opcional)
- Dias / Quantidade Dias

#### 2. Navegação no Dashboard

**Menu Principal:**
- 🏠 **Início**: Visão geral rápida
- 📊 **Dashboards**: Análises visuais
- 📈 **Análises**: Módulos analíticos
- 🤖 **IA**: Assistente inteligente
- 📄 **Relatórios**: Geração de documentos
- ⚙️ **Configurações**: Preferências

**Dashboard Principal:**
- Cards de KPIs no topo
- Gráficos interativos
- Tabelas com dados detalhados
- Filtros laterais

#### 3. Filtros e Segmentação

**Filtros Disponíveis:**
- 📅 **Período**: Selecione data início e fim
- 🏢 **Secretaria**: Múltipla seleção
- 👤 **Sexo**: M, F ou Todos
- 🎂 **Faixa Etária**: Intervalos de 10 anos
- 💼 **Cargo**: Lista dinâmica
- 🏥 **CID**: Por capítulo, grupo ou código específico

**Como Usar:**
1. Abra o painel de filtros (ícone 🔍)
2. Selecione os filtros desejados
3. Clique em "Aplicar"
4. Os gráficos atualizam automaticamente

#### 4. Análise por CID

**Visualizações:**
- **Top 10 CIDs**: Mais recorrentes
- **Por Capítulo**: F (Mental), M (Musculoesquelético), etc.
- **Por Categoria**: Agrupamento inteligente
- **Timeline**: Evolução temporal de cada CID

**Insights Automáticos:**
- Identificação de CIDs em crescimento
- Comparação com períodos anteriores
- Alertas de picos anormais

#### 5. Análise de Padrões

**Padrões Temporais:**
- 📅 **Segunda-feira**: % de afastamentos que começam na segunda
- 🎉 **Véspera de Feriado**: Detecção de padrões suspeitos
- 📆 **Sazonalidade**: Identificação de meses críticos

**Análise de Reincidência:**
- Servidores com múltiplos afastamentos
- Intervalo médio entre afastamentos
- CIDs mais associados à reincidência

**Afastamentos Prolongados:**
- Lista de afastamentos > 15 dias
- Análise de causas
- Tendências temporais

#### 6. Assistente de IA

**Funcionalidades:**
- 💬 **Perguntas Naturais**: "Quais os CIDs mais comuns em 2024?"
- 📝 **Geração de Relatórios**: "Crie um relatório executivo sobre absenteísmo mental"
- 🔍 **Análises Profundas**: "Analise padrões de reincidência por departamento"
- 💡 **Recomendações**: Sugestões baseadas nos dados

**Como Usar:**
1. Acesse o módulo de IA (ícone 🤖)
2. Digite sua pergunta ou solicitação
3. A IA processa os dados em tempo real
4. Receba análise detalhada com:
   - Texto interpretativo
   - Dados estatísticos
   - Visualizações
   - Recomendações

**Exemplos de Perguntas:**
- "Qual secretaria tem maior absenteísmo?"
- "Mostre a evolução de transtornos mentais nos últimos 12 meses"
- "Identifique servidores com padrão de ausência em segundas-feiras"
- "Compare absenteísmo por faixa etária"
- "Quais CIDs têm maior duração média?"

#### 7. Geração de Relatórios

**Tipos de Relatórios:**

1. **📋 Resumo Executivo** (2-3 páginas)
   - Principais KPIs
   - Destaques do período
   - Recomendações prioritárias
   - Ideal para: Gestores e diretoria

2. **📊 Relatório Técnico Completo** (10-20 páginas)
   - Análise detalhada de todos os aspectos
   - Metodologia
   - Gráficos e tabelas
   - Análises estatísticas
   - Conclusões e recomendações
   - Ideal para: Analistas e técnicos

3. **📸 Snapshot do Dashboard**
   - Captura visual do dashboard atual
   - Mantém filtros aplicados
   - Ideal para: Apresentações rápidas

4. **📑 Relatório Personalizado**
   - Escolha seções específicas
   - Configure layout
   - Adicione comentários personalizados
   - Ideal para: Necessidades específicas

**Processo de Geração:**

1. Clique em "📄 Gerar Relatório"
2. Escolha o tipo
3. Selecione formato (PDF, Word, Excel)
4. Configure opções:
   - Incluir/excluir seções
   - Adicionar logo institucional
   - Personalizar cabeçalho/rodapé
5. Clique em "Gerar"
6. Aguarde processamento (15-60 segundos)
7. Download automático ou visualização

**Formatos de Exportação:**
- **PDF**: Relatórios formatados, prontos para impressão
- **Word (.docx)**: Editável, para ajustes finais
- **Excel (.xlsx)**: Dados brutos para análises complementares
- **Impressão**: Impressão direta do navegador

#### 8. Exportação de Dados

**Exportar Visualizações:**
- Clique no ícone de download em qualquer gráfico
- Escolha formato: PNG, SVG, PDF
- Resolução HD automática

**Exportar Tabelas:**
- Clique em "Exportar" acima da tabela
- Formatos: Excel, CSV
- Mantém filtros e ordenação aplicados

**Exportar Dataset Completo:**
- Dashboard → Datasets → [Seu Dataset] → Exportar
- Formato completo com todas transformações aplicadas

### Para Visualizadores (Viewers)

**Permissões:**
- ✅ Visualizar dashboards
- ✅ Aplicar filtros
- ✅ Visualizar relatórios existentes
- ❌ Não pode fazer upload de dados
- ❌ Não pode gerar novos relatórios
- ❌ Não pode usar IA

**Navegação:**
- Acesse dashboards pré-configurados
- Use filtros para explorar dados
- Visualize relatórios compartilhados

## 🎓 Casos de Uso

### Caso 1: Análise Mensal Rápida
**Objetivo**: Gerar relatório executivo mensal

1. Upload dos dados do mês
2. Dashboard → Visão Geral
3. Aplicar filtro de período (último mês)
4. Clicar em "IA" → "Analise o último mês"
5. Gerar Relatório Executivo em PDF
6. **Tempo total: 3-5 minutos**

### Caso 2: Investigação de Pico de Absenteísmo
**Objetivo**: Entender aumento repentino de afastamentos

1. Dashboard → Análise Temporal
2. Identificar período com pico
3. Aplicar filtro no período específico
4. Análise por CID para identificar causa
5. IA: "Por que houve aumento de afastamentos em março?"
6. Gerar relatório técnico com achados

### Caso 3: Planejamento de Ações Preventivas
**Objetivo**: Identificar grupos de risco

1. Dashboard → Análise de Padrões
2. Visualizar reincidência
3. Filtrar por CIDs de saúde mental (F)
4. Analisar demografia dos afetados
5. IA: "Sugira ações preventivas para transtornos mentais"
6. Compartilhar relatório com RH

### Caso 4: Relatório Anual para Diretoria
**Objetivo**: Apresentação executiva anual

1. Selecionar dados do ano completo
2. Dashboard → Todas as análises
3. IA: "Crie um relatório executivo anual"
4. Gerar Relatório Executivo (PDF)
5. Exportar gráficos principais (PNG)
6. Preparar apresentação

## 🔧 Manutenção e Administração

### Backup de Dados

**Backup Automático:**
- Configurado via Vercel/Supabase
- Snapshots diários automáticos
- Retenção de 30 dias

**Backup Manual:**
```bash
# Via Prisma
npx prisma db pull
npx prisma db push --preview-feature

# Export SQL
pg_dump DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### Monitoramento

**Métricas Importantes:**
- Tempo de upload de arquivos
- Tempo de processamento de dados
- Uso de API da OpenAI
- Erros de autenticação

**Logs:**
- Vercel Dashboard → Logs
- Filtrar por erros, warnings

### Atualizações

```bash
# Atualizar dependências
npm update

# Verificar vulnerabilidades
npm audit

# Corrigir automaticamente
npm audit fix
```

## 🆘 Solução de Problemas

### Erro no Upload de Arquivo

**Sintoma**: "Erro ao processar arquivo"

**Soluções:**
1. Verifique o formato do arquivo (apenas .xls, .xlsx, .csv, .sql)
2. Confirme que a primeira linha contém cabeçalhos
3. Verifique se há células mescladas (remova-as)
4. Tamanho máximo: 50MB
5. Tente converter para CSV e fazer upload novamente

### Gráficos Não Carregam

**Sintoma**: Área em branco onde deveria haver gráfico

**Soluções:**
1. Recarregue a página (F5)
2. Limpe cache do navegador
3. Tente outro navegador
4. Verifique console do navegador (F12) para erros

### IA Não Responde

**Sintoma**: "Erro ao gerar análise"

**Soluções:**
1. Verifique se `OPENAI_API_KEY` está configurada
2. Confirme saldo na conta OpenAI
3. Verifique limits da API
4. Tente reformular a pergunta

### Erro de Autenticação

**Sintoma**: "Sessão expirada" constante

**Soluções:**
1. Verifique `NEXTAUTH_SECRET` no `.env`
2. Limpe cookies do navegador
3. Faça logout e login novamente
4. Verifique conexão com banco de dados

## 📊 Estrutura de Dados

### Modelo de Dados Esperado

```csv
matricula,sexo,idade,secretaria,cargo,vinculo,cid,data_inicio,data_fim,dias
1001,M,35,SAUDE,ENFERMEIRO,EFETIVO,F32.1,2024-01-10,2024-01-20,10
1002,F,42,EDUCACAO,PROFESSOR,EFETIVO,M54.5,2024-01-15,2024-02-15,31
...
```

### Transformações Aplicadas

O sistema automaticamente:
- Anonimiza matrículas (se necessário)
- Calcula dias de afastamento (se não informado)
- Extrai capítulo e grupo do CID
- Categoriza faixa etária
- Identifica dia da semana
- Classifica tipo de doença
- Detecta reincidência
- Marca afastamentos prolongados

## 🌟 Recursos Avançados

### Filtros Salvos
- Salve combinações de filtros frequentes
- Compartilhe filtros com equipe
- Aplique com um clique

### Dashboards Personalizados
- Crie dashboards específicos por secretaria
- Configure visualizações padrão
- Compartilhe com usuários específicos

### Alertas Automáticos
- Configure alertas para picos anormais
- Notificações por email
- Thresholds personalizáveis

### API REST
- Acesse dados via API
- Integre com outros sistemas
- Documentação em `/api/docs`

## 📱 Suporte a Dispositivos

### Desktop
- **Resolução Mínima**: 1280x720
- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Experiência**: Completa

### Tablet
- **Orientação**: Landscape recomendado
- **Navegadores**: Chrome, Safari
- **Experiência**: Otimizada

### Mobile
- **Resolução Mínima**: 375x667
- **Navegadores**: Chrome, Safari
- **Experiência**: Adaptada (alguns gráficos simplificados)

## 🔐 Segurança

### Boas Práticas
- Use senhas fortes (min. 12 caracteres)
- Ative 2FA (em desenvolvimento)
- Faça backup regular
- Monitore logs de acesso
- Revogue acessos inutilizados

### Conformidade LGPD
- Dados anonimizados por padrão
- Não armazena dados sensíveis desnecessários
- Logs de acesso e modificações
- Direito de exclusão garantido

## 🚀 Roadmap

### Versão 1.1 (Q1 2025)
- [ ] Autenticação 2FA
- [ ] Integração com Active Directory
- [ ] Mobile app (React Native)
- [ ] Modo offline

### Versão 1.2 (Q2 2025)
- [ ] Machine Learning para previsões
- [ ] Análise preditiva de riscos
- [ ] Integração com sistemas de RH
- [ ] Dashboard em tempo real

### Versão 2.0 (Q3 2025)
- [ ] Multi-tenancy
- [ ] White-label
- [ ] API pública
- [ ] Marketplace de plugins

## 💬 Suporte

### Documentação
- **Manual Completo**: `/docs`
- **API Reference**: `/api/docs`
- **Video Tutoriais**: YouTube

### Contato
- **Email**: suporte@sistema.com
- **Chat**: Dentro do sistema (ícone 💬)
- **Issues**: GitHub Issues

## 📄 Licença

MIT License - Veja arquivo LICENSE para detalhes.

## 🙏 Créditos

Desenvolvido com:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Chart.js](https://www.chartjs.org/)
- [OpenAI](https://openai.com/)

---

**Sistema de Análise de Absenteísmo-Doença** © 2025  
Transformando dados em insights acionáveis para uma gestão mais eficiente e humana.
