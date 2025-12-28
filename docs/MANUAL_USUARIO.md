# 📖 Manual do Usuário - Sistema de Análise de Absenteísmo

## Sumário

1. [Introdução](#introdução)
2. [Primeiros Passos](#primeiros-passos)
3. [Guia por Perfil de Usuário](#guia-por-perfil-de-usuário)
4. [Funcionalidades Detalhadas](#funcionalidades-detalhadas)
5. [Perguntas Frequentes](#perguntas-frequentes)
6. [Solução de Problemas](#solução-de-problemas)

---

## Introdução

### O que é o Sistema?

O Sistema de Análise de Absenteísmo-Doença é uma plataforma web completa para análise inteligente de dados de afastamentos no setor público. Com tecnologia de ponta e inteligência artificial, o sistema transforma dados brutos em insights acionáveis.

### Principais Benefícios

✅ **Automatização Completa**: Upload e processamento automático de dados  
✅ **Inteligência Artificial**: Análises e relatórios gerados automaticamente  
✅ **Visualizações Profissionais**: Dashboards interativos e modernos  
✅ **Detecção de Padrões**: Identificação inteligente de tendências e anomalias  
✅ **Relatórios Executivos**: Documentos prontos para apresentação  
✅ **100% Web**: Acesse de qualquer lugar, sem instalação

---

## Primeiros Passos

### 1. Acesso ao Sistema

**URL de Acesso**: https://seu-sistema.vercel.app

**Credenciais Iniciais** (altere após primeiro acesso):
- Email: admin@sistema.com
- Senha: admin123

### 2. Interface Principal

Após o login, você verá:

```
┌─────────────────────────────────────────┐
│  🏠 Início                              │
│  📤 Upload de Dados                     │
│  📊 Dashboards                          │
│  📈 Análise por CID                     │
│  📅 Análise Temporal                    │
│  ⚠️  Padrões e Alertas                  │
│  🤖 Assistente IA                       │
│  📄 Relatórios                          │
│  👥 Usuários                            │
│  ⚙️  Configurações                      │
└─────────────────────────────────────────┘
```

### 3. Primeiro Upload

**Passo a Passo:**

1. Clique em "📤 Upload de Dados" no menu
2. Prepare sua planilha (veja formato abaixo)
3. Arraste o arquivo ou clique para selecionar
4. Aguarde o processamento automático
5. Pronto! Seus dados estão disponíveis

**Formato da Planilha:**

| matricula | sexo | idade | secretaria | cargo | cid | data_inicio | dias |
|-----------|------|-------|------------|-------|-----|-------------|------|
| 1001 | M | 35 | SAUDE | ENFERMEIRO | F32.1 | 2024-01-10 | 10 |
| 1002 | F | 42 | EDUCACAO | PROFESSOR | M54.5 | 2024-01-15 | 31 |

⚠️ **Importante**: A primeira linha DEVE conter os cabeçalhos!

---

## Guia por Perfil de Usuário

### 👑 Administrador

**Responsabilidades:**
- Gerenciar todos os usuários do sistema
- Configurar permissões e acessos
- Monitorar uso e performance
- Realizar backups e manutenção

**Primeiras Tarefas:**
1. Alterar senha padrão
2. Criar usuários para a equipe
3. Configurar permissões por departamento
4. Testar upload com dados de amostra

**Acesso a:**
- ✅ Todas as funcionalidades
- ✅ Gerenciamento de usuários
- ✅ Configurações do sistema
- ✅ Logs de auditoria

---

### 👔 Gestor (Manager)

**Responsabilidades:**
- Fazer upload de dados mensais
- Gerar relatórios executivos
- Acompanhar indicadores principais
- Tomar decisões baseadas em dados

**Fluxo de Trabalho Mensal:**

```
📥 Upload de Dados
    ↓
📊 Análise no Dashboard
    ↓
🤖 Consulta ao Assistente IA
    ↓
📄 Geração de Relatório Executivo
    ↓
📧 Compartilhamento com Diretoria
```

**Acesso a:**
- ✅ Upload de dados
- ✅ Todos os dashboards
- ✅ Assistente de IA
- ✅ Geração de relatórios
- ✅ Exportação de dados

---

### 📊 Analista (Analyst)

**Responsabilidades:**
- Análises profundas dos dados
- Identificação de padrões
- Criação de relatórios técnicos
- Suporte à tomada de decisão

**Ferramentas Principais:**

1. **Dashboards Interativos**
   - Visão geral
   - Análise por CID
   - Análise temporal
   - Padrões e tendências

2. **Assistente de IA**
   - Perguntas complexas
   - Análises estatísticas
   - Detecção de anomalias

3. **Geração de Relatórios**
   - Relatórios técnicos completos
   - Análises customizadas

**Acesso a:**
- ✅ Visualização de todos os dados
- ✅ Ferramentas de análise
- ✅ Assistente de IA
- ✅ Geração de relatórios
- ❌ Upload de novos dados
- ❌ Gerenciamento de usuários

---

### 👀 Visualizador (Viewer)

**Responsabilidades:**
- Acompanhar indicadores
- Visualizar relatórios compartilhados
- Consultar dados históricos

**Navegação:**
1. Acesse dashboards pré-configurados
2. Use filtros para explorar dados
3. Visualize relatórios salvos
4. Exporte gráficos específicos

**Acesso a:**
- ✅ Visualização de dashboards
- ✅ Aplicação de filtros
- ✅ Visualização de relatórios existentes
- ✅ Exportação de gráficos
- ❌ Upload de dados
- ❌ Criação de relatórios
- ❌ Assistente de IA

---

## Funcionalidades Detalhadas

### 📤 Upload de Dados

#### Formatos Suportados

| Formato | Extensão | Tamanho Máximo |
|---------|----------|----------------|
| Excel 97-2003 | .xls | 50 MB |
| Excel 2007+ | .xlsx | 50 MB |
| Excel Binary | .xlsb | 50 MB |
| CSV | .csv | 50 MB |
| SQL Dump | .sql | 50 MB |

#### Colunas Reconhecidas

O sistema reconhece automaticamente diversas variações de nomes:

**Matrícula**: matricula, matrícula, id, codigo, código, employee_id  
**Sexo**: sexo, genero, gênero, sex, gender  
**Idade**: idade, age, years  
**Secretaria**: secretaria, departamento, orgao, órgão, setor, department  
**Cargo**: cargo, funcao, função, position, role  
**Vínculo**: vinculo, vínculo, tipo, contrato, employment_type  
**CID**: cid, codigo_cid, código_cid, icd  
**Data Início**: data_inicio, inicio, início, start_date, date  
**Data Fim**: data_fim, fim, end_date, return_date  
**Dias**: dias, quantidade_dias, duracao, duração, days  

#### Validações Automáticas

✅ Formato de data (DD/MM/YYYY ou YYYY-MM-DD)  
✅ CID válido (formato A00.0)  
✅ Idade entre 18 e 70 anos  
✅ Sexo M ou F  
✅ Dias maior que 0

#### Processamento

```
1. UPLOAD
   ↓
2. VALIDAÇÃO
   ↓
3. MAPEAMENTO DE COLUNAS
   ↓
4. ENRIQUECIMENTO
   - Extração capítulo CID
   - Cálculo faixa etária
   - Identificação dia da semana
   - Classificação tipo de doença
   ↓
5. ARMAZENAMENTO
   ↓
6. PRONTO!
```

---

### 📊 Dashboards

#### Visão Geral

**Indicadores Principais:**
- 📈 Total de Afastamentos
- 📅 Total de Dias Afastados
- ⏱️ Média de Dias por Afastamento
- 📊 Taxa de Absenteísmo

**Gráficos:**
- Evolução temporal (linha)
- Distribuição por secretaria (barras)
- CIDs mais comuns (pizza)
- Distribuição demográfica (barras)

#### Filtros Disponíveis

```
📅 PERÍODO
   └─ Data início e fim
   
🏢 SECRETARIA
   └─ Múltipla seleção
   
👤 SEXO
   └─ Masculino / Feminino / Todos
   
🎂 FAIXA ETÁRIA
   └─ <20, 20-29, 30-39, 40-49, 50-59, 60+
   
💼 CARGO
   └─ Lista dinâmica baseada nos dados
   
🏥 CID
   ├─ Por capítulo (A-Z)
   ├─ Por grupo (A00, A01, etc)
   └─ Código específico (A00.0)
```

#### Interatividade

**Clique nos gráficos:**
- 🖱️ Hover para detalhes
- 📌 Clique para filtrar
- 🔍 Zoom com scroll
- 💾 Exportar imagem (PNG, SVG, PDF)

---

### 🤖 Assistente de IA

#### O que é?

Um assistente inteligente que responde perguntas em linguagem natural sobre seus dados.

#### Como Usar

1. Digite sua pergunta naturalmente
2. Clique em "Enviar" ou pressione Enter
3. Aguarde a análise (15-30 segundos)
4. Receba resposta detalhada

#### Exemplos de Perguntas

**Análises Gerais:**
- "Qual secretaria tem mais afastamentos?"
- "Mostre as tendências dos últimos 6 meses"
- "Qual a média de dias por faixa etária?"

**Análises por CID:**
- "Quais os CIDs mais comuns na Educação?"
- "Analise transtornos mentais (CID F)"
- "Compare CID M (musculoesquelético) entre departamentos"

**Padrões Temporais:**
- "Há padrão de afastamento em segundas-feiras?"
- "Identifique picos sazonais"
- "Analise vésperas de feriados"

**Geração de Relatórios:**
- "Crie um relatório executivo sobre dezembro"
- "Gere análise técnica de reincidência"
- "Faça um resumo para a diretoria"

#### Dicas para Melhores Respostas

✅ **Seja específico**: "CID F32 em dezembro" vs "depressão"  
✅ **Use contexto**: "Compare com ano anterior"  
✅ **Peça números**: "Mostre percentuais e estatísticas"  
✅ **Solicite ações**: "Sugira intervenções"

---

### 📄 Relatórios

#### Tipos de Relatórios

**1. Resumo Executivo (2-3 páginas)**

Conteúdo:
- ✓ Principais KPIs
- ✓ Destaques do período
- ✓ Top 5 insights
- ✓ Recomendações prioritárias
- ✓ Gráficos principais

Ideal para: Gestores, Diretoria

**2. Relatório Técnico Completo (15-20 páginas)**

Conteúdo:
- ✓ Metodologia detalhada
- ✓ Todas as análises
- ✓ Gráficos e tabelas completas
- ✓ Análises estatísticas
- ✓ Testes de hipóteses
- ✓ Conclusões detalhadas
- ✓ Anexos com dados brutos

Ideal para: Analistas, Pesquisadores

**3. Snapshot do Dashboard (1-2 páginas)**

Conteúdo:
- ✓ Captura visual do dashboard
- ✓ Mantém filtros aplicados
- ✓ Data e hora da geração

Ideal para: Reuniões rápidas, Status reports

**4. Relatório Personalizado**

Conteúdo:
- ✓ Escolha seções específicas
- ✓ Configure ordem e layout
- ✓ Adicione comentários
- ✓ Customize visualizações

Ideal para: Necessidades específicas

#### Formatos de Exportação

**PDF** 📄
- ✅ Melhor para: Apresentações, Impressão
- ✅ Mantém formatação
- ✅ Não editável
- ✅ Universalmente compatível

**Word (.docx)** 📝
- ✅ Melhor para: Edição posterior
- ✅ Adicionar comentários
- ✅ Ajustar conteúdo
- ✅ Colaboração

**Excel (.xlsx)** 📊
- ✅ Melhor para: Análises complementares
- ✅ Dados brutos incluídos
- ✅ Tabelas dinâmicas
- ✅ Gráficos interativos

**Impressão** 🖨️
- ✅ Melhor para: Arquivamento físico
- ✅ Otimizado para papel A4
- ✅ Cabeçalho/rodapé configurável

---

### ⚙️ Configurações

#### Preferências Pessoais

**Tema**
- ☀️ Claro
- 🌙 Escuro
- 🔄 Automático (segue sistema)

**Idioma**
- 🇧🇷 Português (BR)
- 🇺🇸 English
- 🇪🇸 Español

**Notificações**
- 📧 Email
- 🔔 No sistema
- 📱 Push (mobile)

**Fuso Horário**
- 🌎 América/São_Paulo
- 🌍 Outros

#### Configurações de Dashboard

**Dashboard Padrão**
- Escolha qual dashboard abrir ao fazer login

**Filtros Salvos**
- Salve combinações frequentes
- Nomeie para fácil acesso
- Compartilhe com equipe

**Frequência de Atualização**
- Tempo real
- A cada 5 minutos
- Manual

---

## Perguntas Frequentes

### Geral

**P: O sistema funciona offline?**
R: Não, é necessária conexão com internet. Planejamos modo offline para versão futura.

**P: Posso acessar pelo celular?**
R: Sim! O sistema é totalmente responsivo e funciona em smartphones e tablets.

**P: Os dados são seguros?**
R: Sim. Usamos criptografia de ponta a ponta, dados anonimizados e servidores seguros.

**P: Quantos usuários posso criar?**
R: Ilimitado, dependendo do seu plano.

### Upload de Dados

**P: Por que meu arquivo não foi aceito?**
R: Verifique se:
- Formato é suportado (.xls, .xlsx, .csv, .sql)
- Tamanho é menor que 50MB
- Primeira linha contém cabeçalhos
- Não há células mescladas

**P: Posso fazer upload de múltiplos arquivos?**
R: Sim! Faça upload um por vez ou combine em uma planilha única.

**P: O que acontece com uploads anteriores?**
R: Ficam salvos e acessíveis. Você pode visualizar histórico completo.

### Análises

**P: Como interpretar o CID?**
R: O sistema categoriza automaticamente:
- F: Transtornos mentais
- M: Musculoesqueléticas
- J: Respiratórias
- E assim por diante...

**P: O que são "padrões detectados"?**
R: Algoritmos identificam:
- Concentração em dias específicos
- Sazonalidade
- Reincidências
- Outliers (anomalias)

**P: A IA pode errar?**
R: A IA é altamente precisa mas revise sempre análises críticas. Use como apoio à decisão.

### Relatórios

**P: Posso editar relatórios após gerar?**
R: Sim, exporte em Word (.docx) e edite livremente.

**P: Como adiciono meu logo institucional?**
R: Configurações → Personalização → Logo

**P: Posso programar relatórios automáticos?**
R: Sim! Configure em Configurações → Relatórios Agendados

---

## Solução de Problemas

### Problemas Comuns

#### 1. Não consigo fazer login

**Soluções:**
- ✓ Verifique se está digitando email correto
- ✓ Use "Esqueci minha senha" para resetar
- ✓ Limpe cache do navegador (Ctrl + F5)
- ✓ Tente navegador diferente
- ✓ Contate administrador

#### 2. Upload falha constantemente

**Soluções:**
- ✓ Verifique conexão de internet
- ✓ Reduza tamanho do arquivo
- ✓ Salve em formato .xlsx mais recente
- ✓ Remova células mescladas
- ✓ Exporte para CSV e tente novamente

#### 3. Gráficos não aparecem

**Soluções:**
- ✓ Recarregue página (F5)
- ✓ Desabilite bloqueadores de anúncio
- ✓ Atualize navegador para última versão
- ✓ Verifique se JavaScript está habilitado
- ✓ Teste em modo anônimo

#### 4. IA não responde

**Soluções:**
- ✓ Verifique se há dados carregados
- ✓ Reformule pergunta mais claramente
- ✓ Aguarde um pouco mais (até 60s)
- ✓ Verifique status da API (topo da página)
- ✓ Tente em horário diferente

#### 5. Relatório não gera

**Soluções:**
- ✓ Aguarde tempo necessário (veja tempo estimado)
- ✓ Verifique espaço em disco
- ✓ Desabilite popup blocker
- ✓ Tente formato diferente (PDF → Word)
- ✓ Reduza período de análise

### Códigos de Erro

| Código | Significado | Solução |
|--------|-------------|---------|
| 400 | Requisição inválida | Verifique dados enviados |
| 401 | Não autenticado | Faça login novamente |
| 403 | Sem permissão | Contate administrador |
| 404 | Não encontrado | Verifique URL |
| 500 | Erro no servidor | Aguarde e tente novamente |
| 503 | Serviço indisponível | Servidor em manutenção |

### Contato para Suporte

**Email**: suporte@sistema.com  
**Chat**: Clique no ícone 💬 no canto inferior direito  
**Telefone**: (00) 0000-0000  
**Horário**: Segunda a Sexta, 8h às 18h

---

## Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl + K` | Busca rápida |
| `Ctrl + U` | Upload de dados |
| `Ctrl + D` | Dashboard principal |
| `Ctrl + R` | Gerar relatório |
| `Ctrl + /` | Ajuda/Manual |
| `Ctrl + Shift + T` | Alternar tema |
| `Esc` | Fechar modal |
| `Tab` | Navegar campos |
| `Enter` | Confirmar/Enviar |

---

## Glossário

**Absenteísmo**: Ausência do trabalho por motivo de doença ou problemas de saúde

**CID**: Classificação Internacional de Doenças

**Dataset**: Conjunto de dados carregado no sistema

**Dashboard**: Painel com visualizações e indicadores

**KPI**: Indicador-chave de performance

**Reincidência**: Múltiplos afastamentos do mesmo servidor

**Outlier**: Valor anômalo ou atípico nos dados

**ROI**: Retorno sobre investimento

**Snapshot**: Captura instantânea de dados/visualizações

---

**Manual do Usuário v1.0** | Atualizado em 27/12/2024  
© 2025 Sistema de Análise de Absenteísmo-Doença
