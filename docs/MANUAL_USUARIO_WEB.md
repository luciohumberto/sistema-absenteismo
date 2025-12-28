# 📖 Manual do Usuário

## Sistema de Análise de Absenteísmo-Doença no Setor Público

**Versão:** 1.0  
**Data:** Dezembro 2024  
**Tipo:** Sistema WEB Hospedado  
**Acesso:** Via navegador (online)

---

## 📋 Índice

1. [Introdução](#introdução)
2. [Acesso ao Sistema](#acesso-ao-sistema)
3. [Interface Principal](#interface-principal)
4. [Funcionalidades por Perfil](#funcionalidades-por-perfil)
5. [Upload de Dados](#upload-de-dados)
6. [Dashboards e Análises](#dashboards-e-análises)
7. [Assistente de IA](#assistente-de-ia)
8. [Geração de Relatórios](#geração-de-relatórios)
9. [Perguntas Frequentes](#perguntas-frequentes)

---

## 1. Introdução

### O que é o Sistema?

O Sistema de Análise de Absenteísmo-Doença é uma **aplicação WEB hospedada na nuvem** que permite ao setor público brasileiro analisar, monitorar e gerar insights sobre afastamentos de servidores por motivo de saúde.

### Características Principais

✅ **100% Online** - Acesso via navegador, sem instalação  
✅ **Multiplataforma** - Funciona em computador, tablet e smartphone  
✅ **Análise Inteligente** - IA para gerar insights automaticamente  
✅ **Dashboards Interativos** - Visualizações dinâmicas e filtros personalizados  
✅ **Upload Simplificado** - Arraste e solte arquivos Excel/CSV (até 120MB)  
✅ **Relatórios Profissionais** - Exportação em PDF, Word e Excel  
✅ **Seguro** - Autenticação, controle de acesso e criptografia

### Requisitos de Acesso

- **Navegador:** Chrome 90+, Firefox 88+, Edge 90+, ou Safari 14+
- **Conexão:** Internet banda larga (mínimo 1 Mbps)
- **Credenciais:** Login e senha fornecidos pelo administrador do sistema
- **Tela:** Resolução mínima 1280x720 (recomendado: 1920x1080)

---

## 2. Acesso ao Sistema

### 2.1 Como Acessar

1. Abra seu navegador preferido
2. Digite o endereço do sistema: **`https://[seu-dominio].vercel.app`**
3. A tela de login será exibida

![Tela de Login](assets/screenshots/01-login.png)

### 2.2 Realizando Login

1. Digite seu **e-mail** no campo "Email"
2. Digite sua **senha** no campo "Senha"
3. Clique no botão **"Entrar"**
4. Você será redirecionado para o dashboard principal

**💡 Dica:** Use o modo escuro clicando no ícone da lua/sol no canto superior direito.

### 2.3 Recuperação de Senha

Se esqueceu sua senha:

1. Clique em **"Esqueci minha senha"** na tela de login
2. Digite seu e-mail cadastrado
3. Você receberá um link de recuperação por e-mail
4. Clique no link e defina uma nova senha

### 2.4 Primeiro Acesso

No primeiro acesso, você será solicitado a:

- ✅ Alterar sua senha padrão
- ✅ Confirmar seus dados cadastrais
- ✅ Revisar os termos de uso

---

## 3. Interface Principal

### 3.1 Estrutura da Tela

A interface é dividida em 4 áreas principais:

![Dashboard Principal](assets/screenshots/02-dashboard-home.png)

#### A. Barra Superior (Header)
- Logo do sistema
- Título da página atual
- Alternador de tema (claro/escuro)
- Notificações
- Menu do usuário (perfil, configurações, sair)

#### B. Menu Lateral (Sidebar)
Navegação principal com as seguintes opções:

- 🏠 **Home** - Dashboard resumido
- 📤 **Upload** - Carregar novos dados
- 📊 **Dashboards** - Análises gerais
- 🏥 **Análise CID** - Detalhamento por doença
- 📅 **Análise Temporal** - Padrões ao longo do tempo
- 🔍 **Detecção de Padrões** - Anomalias e tendências
- 🤖 **Assistente IA** - Chat inteligente
- 📄 **Relatórios** - Geração de documentos
- 👥 **Usuários** - Gerenciamento (apenas admin)
- ⚙️ **Configurações** - Preferências do sistema

#### C. Área de Conteúdo
Exibe o conteúdo da página selecionada

#### D. Rodapé
Informações de versão e links úteis

### 3.2 Navegação

**Desktop:**
- Clique nos itens do menu lateral para navegar
- Use breadcrumbs (migalhas de pão) para voltar

**Mobile/Tablet:**
- Toque no ícone ☰ para abrir o menu
- Deslize para fechar o menu
- Use o botão "voltar" do navegador

---

## 4. Funcionalidades por Perfil

O sistema possui 4 níveis de acesso:

### 4.1 Administrador 🔴

**O que pode fazer:**
- ✅ Gerenciar usuários (criar, editar, desativar)
- ✅ Upload de dados
- ✅ Visualizar todos os dashboards
- ✅ Gerar qualquer tipo de relatório
- ✅ Acessar configurações do sistema
- ✅ Usar assistente de IA
- ✅ Exportar dados completos
- ✅ Visualizar logs de auditoria

**Casos de uso típicos:**
- Configuração inicial do sistema
- Criação de contas para gestores
- Monitoramento geral do sistema
- Análises estratégicas

### 4.2 Gestor 🔵

**O que pode fazer:**
- ✅ Upload de novos datasets
- ✅ Visualizar todos os dashboards
- ✅ Gerar relatórios executivos e técnicos
- ✅ Usar assistente de IA
- ✅ Exportar visualizações
- ❌ Não pode gerenciar usuários
- ❌ Não pode alterar configurações do sistema

**Casos de uso típicos:**
- Upload mensal de dados de RH
- Geração de relatórios para diretoria
- Análise de tendências departamentais
- Planejamento de ações preventivas

### 4.3 Analista 🟢

**O que pode fazer:**
- ✅ Visualizar dashboards e análises
- ✅ Usar assistente de IA para consultas
- ✅ Gerar relatórios básicos
- ✅ Exportar gráficos individuais
- ❌ Não pode fazer upload de dados
- ❌ Não pode gerar relatórios executivos

**Casos de uso típicos:**
- Análise diária de indicadores
- Responder consultas pontuais
- Preparar apresentações
- Monitorar alertas

### 4.4 Visualizador ⚪

**O que pode fazer:**
- ✅ Visualizar dashboards públicos
- ✅ Ver relatórios compartilhados
- ❌ Não pode exportar dados
- ❌ Não pode usar IA
- ❌ Não pode gerar relatórios

**Casos de uso típicos:**
- Consulta ocasional de métricas
- Visualização de relatórios compartilhados
- Acompanhamento de indicadores

---

## 5. Upload de Dados

### 5.1 Preparando seus Dados

O sistema aceita planilhas Excel ou arquivos CSV com as seguintes colunas:

#### Colunas Obrigatórias:

| Coluna | Descrição | Formato | Exemplo |
|--------|-----------|---------|---------|
| Matrícula | Código do servidor | Texto/Número | 12345 |
| Nome | Nome completo | Texto | João Silva |
| CID | Código CID-10 | Texto | F32.1 |
| Data Início | Data do afastamento | DD/MM/AAAA | 15/03/2024 |
| Data Fim | Data do retorno | DD/MM/AAAA | 22/03/2024 |

#### Colunas Opcionais (enriquecem a análise):

- Secretaria/Departamento
- Cargo/Função
- Sexo
- Idade/Data de Nascimento
- Vínculo (efetivo, contratado, etc.)
- Dias de Afastamento (calculado automaticamente se não fornecido)

### 5.2 Formatos Aceitos

✅ **Excel:** `.xls`, `.xlsx`, `.xlsb`  
✅ **CSV:** `.csv` (UTF-8, separado por vírgula ou ponto-e-vírgula)  
✅ **SQL:** `.sql` (scripts de insert)

**Tamanho máximo:** 120 MB por arquivo  
**Registros:** Sem limite (testado com até 500.000 registros)

### 5.3 Realizando o Upload

![Upload de Dados](assets/screenshots/03-upload.png)

**Passo a Passo:**

1. No menu lateral, clique em **"📤 Upload"**

2. **Arraste e solte** seu arquivo na área indicada  
   *OU*  
   Clique em **"Selecionar Arquivo"** e escolha o arquivo

3. O sistema mostrará:
   - ✅ Nome do arquivo
   - ✅ Tamanho
   - ✅ Número de linhas detectadas

4. Clique em **"Processar Arquivo"**

5. Aguarde o processamento (barra de progresso):
   - ⏳ Leitura do arquivo
   - ⏳ Detecção de colunas
   - ⏳ Validação de dados
   - ⏳ Enriquecimento (CID, idade, etc.)
   - ⏳ Gravação no banco de dados

6. **Pronto!** Mensagem de sucesso será exibida

**⏱️ Tempo estimado:**
- 1.000 registros: ~10 segundos
- 10.000 registros: ~45 segundos
- 100.000 registros: ~5 minutos

### 5.4 Mapeamento Automático de Colunas

O sistema **detecta automaticamente** as colunas, mesmo com nomes diferentes:

**Exemplos aceitos para "Matrícula":**
- matrícula, matricula, matric, mat
- código, codigo, cod
- id, identificador
- registro, reg

**Exemplos aceitos para "CID":**
- CID, cid, CID-10, CID10
- código CID, codigo CID
- doença, doenca, diagnóstico

Se a detecção falhar, você pode mapear manualmente na tela.

### 5.5 Validações Automáticas

Durante o upload, o sistema valida:

❌ **CID inválido** → Alerta e sugestão de correção  
❌ **Data inválida** → Registro ignorado com log  
❌ **Dados duplicados** → Opção de pular ou substituir  
❌ **Campos obrigatórios vazios** → Registro ignorado

Um relatório de validação é gerado ao final.

---

## 6. Dashboards e Análises

### 6.1 Dashboard Principal (Home)

![Dashboard Home](assets/screenshots/04-dashboard-home.png)

**Visão geral com:**

#### 📊 KPIs Principais (Cards)
- **Total de Afastamentos:** Quantidade absoluta no período
- **Total de Dias Perdidos:** Soma de todos os dias de afastamento
- **Média de Dias:** Duração média por afastamento
- **Taxa de Absenteísmo:** Percentual calculado sobre força de trabalho

Cada KPI mostra:
- Valor atual
- Tendência (↗️ ↘️)
- Variação percentual em relação ao período anterior

#### 🔔 Alertas e Ações Rápidas
- Avisos de padrões anormais
- Atalhos para funcionalidades principais
- Datasets recentes

#### 📰 Atividades Recentes
- Últimos uploads
- Relatórios gerados
- Ações de usuários

### 6.2 Dashboard de Analytics

![Dashboard Analytics](assets/screenshots/05-analytics.png)

**Localização:** Menu > 📊 Dashboards

#### 🤖 Introdução com IA

No topo da página, o sistema gera automaticamente uma **introdução contextualizada** explicando:
- O que você verá neste dashboard
- Como interpretar os dados
- Dicas de uso

#### 📈 Gráficos Disponíveis:

**1. Evolução Mensal**
- Linha do tempo mostrando afastamentos mês a mês
- Identifica tendências (crescimento/queda)
- Permite comparação entre anos

**2. Distribuição por Departamento**
- Gráfico de barras horizontal
- Top 5 secretarias com mais afastamentos
- Percentual de cada

**3. Distribuição por Capítulo CID**
- Gráfico de pizza/rosca
- Visualização por grupo de doenças
- Cores diferenciadas por categoria

**4. Análise por Faixa Etária**
- Gráfico de barras verticais
- Distribuição: 18-30, 31-40, 41-50, 51-60, 60+
- Identifica grupos de risco

**5. Top 10 CIDs**
- Tabela ordenada
- Código, descrição, quantidade, percentual
- Links para detalhamento

#### 🧠 Análise Inteligente com IA

No final da página, a IA gera **análise automática** incluindo:

✅ **Visão Geral:** Resumo executivo dos números  
✅ **Tendências:** Padrões identificados  
✅ **Alertas:** Pontos críticos que demandam atenção  
✅ **Comparativos:** Benchmarks com setor público  
✅ **Recomendações:** 4-5 ações concretas priorizadas

**Exemplo de Insight Gerado:**

> 📈 **Análise Inteligente dos Resultados**
>
> Com base nos dados de absenteísmo-doença apresentados, identificamos:
>
> **Tendências Principais:**
> • Taxa de absenteísmo em 4.7%, dentro da média do setor (3-8%)
> • Concentração de 68% dos afastamentos em 3 departamentos
> • Padrão sazonal: picos em abril e setembro
>
> ⚠️ **Alertas:**
> • Transtornos mentais (CID F) representam 32% - tendência crescente
> • "Síndrome da Segunda-feira": 83% mais afastamentos às segundas
>
> ✅ **Recomendações:**
> 1. Implementar programa de saúde mental (URGENTE)
> 2. Avaliar ergonomia para reduzir lesões osteomusculares
> 3. Campanha de vacinação pode reduzir 30% de doenças respiratórias

### 6.3 Análise Temporal

![Análise Temporal](assets/screenshots/06-temporal.png)

**Localização:** Menu > 📅 Análise Temporal

#### 🤖 Introdução com IA
Explicação sobre importância da análise temporal e como usar

#### 📊 Visualizações:

**1. Evolução Mensal com Comparação**
- Botão para comparar com ano anterior
- Visualiza sazonalidade
- Identifica períodos críticos

**2. Distribuição por Dia da Semana**
- Detecta "Síndrome da Segunda-feira"
- Gráfico de barras por dia útil
- Percentual de concentração

**3. Análise Trimestral**
- Visão por Q1, Q2, Q3, Q4
- Afastamentos vs Dias perdidos
- Útil para planejamento anual

**4. Padrões Sazonais**
- Inverno, Primavera, Verão, Outono
- Principais CIDs por estação
- Variação percentual

#### 🧠 Análise Inteligente
IA identifica:
- Sazonalidade marcante
- Tendências de longo prazo
- Correlação com eventos (feriados, campanhas)
- Recomendações com timing específico

### 6.4 Análise por CID

![Análise CID](assets/screenshots/07-cid.png)

**Localização:** Menu > 🏥 Análise CID

#### 🤖 Introdução com IA
Explicação sobre CID-10 e sua aplicação na análise

#### 📋 Estrutura:

**1. Capítulos CID (Cards)**
Cada capítulo em um card com:
- Letra e nome (ex: F - Transtornos Mentais)
- Quantidade e percentual
- Tendência (crescimento/queda)
- Cor indicativa de severidade

**Principais capítulos:**
- **F:** Transtornos mentais e comportamentais
- **M:** Doenças osteomusculares
- **J:** Doenças respiratórias
- **K:** Doenças digestivas
- **I:** Doenças cardiovasculares

**2. Top 5 CIDs Detalhados**
Tabela expandida com:
- Código e descrição completa
- Quantidade de casos
- Dias totais perdidos
- Duração média
- Departamentos mais afetados
- Faixa etária predominante

**3. Alertas Específicos**
Cards coloridos com:
- ⚠️ Alerta sobre crescimento de transtornos mentais
- ⚠️ Concentração em determinado departamento
- ⚠️ Recorrência de casos

#### 🧠 Análise Epidemiológica Inteligente
IA gera:
- Análise detalhada dos Top 5 CIDs
- Causas prováveis (organizacionais e ambientais)
- Impacto financeiro estimado
- ROI de programas preventivos
- Protocolos específicos por tipo de CID

### 6.5 Detecção de Padrões

![Detecção de Padrões](assets/screenshots/08-patterns.png)

**Localização:** Menu > 🔍 Detecção de Padrões

#### 🤖 Introdução com IA
Explicação sobre técnicas de detecção e valor preventivo

#### 🎯 Padrões Monitorados:

**1. Síndrome da Segunda-feira**
- Percentual de afastamentos que iniciam às segundas
- Comparação com distribuição esperada
- Significância estatística
- Impacto estimado

**2. Efeito Feriado**
- Aumento pré/pós feriados
- Percentual acima da média
- Custo estimado
- Feriados mais críticos

**3. Recorrência Individual**
- Lista de servidores com 3+ afastamentos
- Risco de cronicidade
- Necessidade de intervenção
- Impacto acumulado

**4. Afastamentos Prolongados**
- Casos com >15 dias
- Principais causas
- Custo por caso
- Protocolo de retorno

**5. Clusters Departamentais**
- Departamentos com taxa anômala
- Comparação com média geral
- Possíveis causas organizacionais

#### 📋 Plano de Ação Automático
Sistema gera lista priorizada de ações:
- **Prioridade:** Urgente / Alta / Média
- **Descrição:** O que fazer
- **Timeline:** Prazo sugerido
- **Responsável:** Área indicada
- **Impacto Esperado:** ROI estimado

#### 🧠 Análise Detalhada de Padrões
IA fornece:
- Interpretação estatística
- Causas raiz prováveis
- Plano de intervenção detalhado
- Budget recomendado
- KPIs para monitoramento

---

## 7. Assistente de IA

![Assistente IA](assets/screenshots/09-ai-assistant.png)

**Localização:** Menu > 🤖 Assistente IA

### 7.1 O que é o Assistente?

Um chatbot inteligente que responde perguntas sobre seus dados em **linguagem natural**. Usa GPT-4 para análises contextualizadas.

### 7.2 Como Usar

1. Digite sua pergunta no campo de texto
2. Clique em "Enviar" ou pressione Enter
3. Aguarde a análise (3-10 segundos)
4. Receba resposta detalhada com insights

### 7.3 Perguntas Sugeridas

O sistema oferece templates prontos:

**📈 Análise de Tendências**
> "Analise as tendências de afastamento nos últimos 6 meses e identifique padrões preocupantes"

**🏢 Comparação Departamental**
> "Compare os departamentos e identifique qual está com maior taxa de absenteísmo"

**🔍 Identificação de Padrões**
> "Identifique padrões anômalos nos afastamentos, como concentração em dias específicos"

**📄 Geração de Relatório**
> "Gere um relatório executivo resumido com os principais indicadores e recomendações"

### 7.4 Exemplos de Perguntas

Você pode fazer perguntas como:

- "Qual a principal causa de afastamento na Secretaria de Educação?"
- "Existe correlação entre idade e tipo de CID?"
- "Qual o custo estimado dos afastamentos por transtornos mentais?"
- "Compare janeiro e dezembro deste ano"
- "Quantos servidores tiveram mais de 3 afastamentos?"
- "Qual o impacto da campanha de vacinação de junho?"

### 7.5 Capacidades da IA

A IA pode:

✅ Responder perguntas sobre os dados  
✅ Gerar insights contextualizados  
✅ Identificar correlações ocultas  
✅ Sugerir ações preventivas  
✅ Calcular métricas e KPIs  
✅ Comparar períodos e departamentos  
✅ Explicar conceitos técnicos (CID, taxas)  
✅ Gerar resumos executivos

### 7.6 Limitações

❌ Não acessa dados de outros sistemas  
❌ Não executa ações (só fornece informações)  
❌ Respostas baseadas nos dados carregados  
❌ Pode levar alguns segundos para processar

---

## 8. Geração de Relatórios

![Geração de Relatórios](assets/screenshots/10-reports.png)

**Localização:** Menu > 📄 Relatórios

### 8.1 Tipos de Relatórios

#### 1. Relatório Executivo 📊

**Para quem:** Diretores, secretários, alta gestão

**Conteúdo:**
- Resumo executivo (1 página)
- KPIs principais com gráficos
- Top 3 insights críticos
- Recomendações estratégicas
- Conclusão e próximos passos

**Formato:** PDF profissional com logo e cabeçalho
**Páginas:** 4-6 páginas
**Tempo de geração:** ~15 segundos

#### 2. Relatório Técnico 📋

**Para quem:** Analistas, técnicos de RH, saúde ocupacional

**Conteúdo:**
- Análise detalhada de todos os indicadores
- Tabelas completas de dados
- Gráficos com análise estatística
- Metodologia utilizada
- Anexos com dados brutos

**Formato:** PDF técnico
**Páginas:** 15-25 páginas
**Tempo de geração:** ~30 segundos

#### 3. Dashboard Snapshot 📸

**Para quem:** Compartilhamento rápido

**Conteúdo:**
- Imagem dos principais gráficos
- KPIs em destaque
- Data e hora da captura
- Filtros aplicados

**Formato:** PDF ou PNG
**Páginas:** 1-2 páginas
**Tempo de geração:** ~5 segundos

#### 4. Relatório Personalizado ⚙️

**Para quem:** Usuários avançados

**Conteúdo:** Você escolhe:
- ☑️ Seções a incluir
- ☑️ Período específico
- ☑️ Departamentos filtrados
- ☑️ CIDs específicos
- ☑️ Nível de detalhamento

**Formato:** PDF, Word ou Excel
**Páginas:** Variável
**Tempo de geração:** ~20-40 segundos

### 8.2 Gerando um Relatório

**Passo a Passo:**

1. Acesse **Menu > 📄 Relatórios**

2. Escolha o **tipo de relatório**

3. Configure os **filtros** (se aplicável):
   - Período (datas inicial e final)
   - Departamentos específicos
   - Faixa etária
   - Tipo de CID

4. Clique em **"Gerar Relatório"**

5. Aguarde o processamento (barra de progresso)

6. **Download automático** ou visualização prévia

7. Salve o arquivo ou compartilhe

### 8.3 Formatos de Exportação

#### 📄 PDF
- Ideal para impressão e compartilhamento
- Mantém formatação
- Inclui gráficos em alta qualidade
- Assinado digitalmente

#### 📝 Word (.docx)
- Editável após geração
- Útil para adicionar comentários
- Mantém estrutura e formatação
- Imagens incorporadas

#### 📊 Excel (.xlsx)
- Dados tabulares completos
- Permite análises adicionais
- Múltiplas planilhas (dados, gráficos, resumo)
- Fórmulas preservadas

### 8.4 Agendamento de Relatórios

**Perfis: Gestor e Administrador**

Configure relatórios automáticos:

1. Acesse **Relatórios > Agendar**

2. Escolha:
   - Tipo de relatório
   - Frequência (semanal/mensal/trimestral)
   - Dia e hora
   - Destinatários (e-mails)

3. Salve o agendamento

4. Relatórios serão gerados e enviados automaticamente

**Exemplo:**
> "Todo dia 1º de cada mês, às 8h, gerar Relatório Executivo e enviar para diretoria@orgao.gov.br"

---

## 9. Perguntas Frequentes

### 9.1 Acesso e Login

**P: Esqueci minha senha, como recupero?**  
R: Clique em "Esqueci minha senha" na tela de login, digite seu e-mail e siga as instruções recebidas.

**P: Posso acessar de qualquer lugar?**  
R: Sim! É um sistema WEB, acesse de qualquer dispositivo com internet.

**P: Funciona no celular?**  
R: Sim, o sistema é responsivo. Melhor experiência em telas maiores (tablet/desktop).

**P: Preciso instalar algum programa?**  
R: Não! Apenas um navegador moderno atualizado.

### 9.2 Upload de Dados

**P: Qual o tamanho máximo do arquivo?**  
R: 120 MB por arquivo.

**P: Quantos registros posso enviar?**  
R: Sem limite teórico. Testado com 500.000 registros com sucesso.

**P: Posso enviar dados de anos anteriores?**  
R: Sim, sem restrição de período histórico.

**P: O que acontece se eu enviar dados duplicados?**  
R: O sistema detecta e oferece opção de pular ou substituir.

**P: Posso apagar dados enviados por engano?**  
R: Sim, administradores podem excluir datasets completos.

**P: Quais colunas são obrigatórias?**  
R: Matrícula, CID, Data Início e Data Fim. Outras enriquecem a análise mas são opcionais.

### 9.3 Análises e Dashboards

**P: Os dados são atualizados em tempo real?**  
R: Sim, após cada upload os dashboards refletem os novos dados.

**P: Posso exportar os gráficos?**  
R: Sim, clique com botão direito em qualquer gráfico > "Salvar imagem".

**P: Como filtro por departamento específico?**  
R: Use os botões de filtro no topo de cada dashboard.

**P: A análise da IA é sempre a mesma?**  
R: Não, é gerada em tempo real baseada nos seus dados atuais.

**P: Posso comparar dois períodos?**  
R: Sim, na Análise Temporal há opção "Comparar com ano anterior".

### 9.4 Relatórios

**P: Quanto tempo leva para gerar um relatório?**  
R: De 5 a 40 segundos dependendo do tipo e quantidade de dados.

**P: Posso personalizar o logo do relatório?**  
R: Sim, administradores podem configurar em Configurações > Identidade Visual.

**P: Relatórios são salvos no sistema?**  
R: Sim, em Relatórios > Histórico você vê os últimos 30 gerados.

**P: Posso agendar envio automático?**  
R: Sim, perfis Gestor e Administrador têm essa função.

### 9.5 Assistente de IA

**P: A IA tem acesso a todos os meus dados?**  
R: Sim, mas apenas aos dados do seu sistema. Não compartilha com externos.

**P: As respostas são sempre corretas?**  
R: São altamente precisas, mas sempre revise informações críticas.

**P: Posso fazer perguntas em português informal?**  
R: Sim! A IA entende linguagem natural.

**P: Há limite de perguntas?**  
R: Sem limite, pergunte à vontade.

**P: A IA funciona sem internet?**  
R: Não, requer conexão (o sistema inteiro é online).

### 9.6 Segurança e Privacidade

**P: Meus dados estão seguros?**  
R: Sim! Criptografia em trânsito e repouso, hospedagem em servidores seguros.

**P: Quem pode ver meus dados?**  
R: Apenas usuários do seu sistema com credenciais válidas.

**P: Fazem backup dos dados?**  
R: Sim, backups automáticos diários.

**P: Como solicito exclusão de dados (LGPD)?**  
R: Entre em contato com o administrador do sistema.

### 9.7 Suporte Técnico

**P: Como reporto um erro?**  
R: Menu > Configurações > Reportar Problema, ou e-mail para suporte@[dominio].com

**P: Há treinamento disponível?**  
R: Sim, consulte o administrador sobre sessões de treinamento.

**P: O sistema fica fora do ar?**  
R: Raramente. Manutenções são agendadas para madrugadas e comunicadas com antecedência.

**P: Posso sugerir melhorias?**  
R: Sim! Menu > Configurações > Enviar Sugestão. Todas são analisadas.

---

## 📞 Contato e Suporte

**E-mail:** suporte@sistema-absenteismo.com  
**Telefone:** (61) 3000-0000  
**Horário:** Segunda a sexta, 8h às 18h  
**Chat:** Disponível no sistema (ícone 💬 no canto inferior direito)

---

## 📜 Termos e Licença

Este sistema está licenciado sob MIT License.  
Desenvolvido para o setor público brasileiro.

**Versão do Manual:** 1.0  
**Última Atualização:** Dezembro 2024

---

**© 2024 Sistema de Análise de Absenteísmo - Todos os direitos reservados**
