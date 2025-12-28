# 📄 Geração de Manual Profissional com Screenshots

Este documento explica como gerar automaticamente o **Manual do Usuário em PDF** com capturas de tela reais do sistema.

## 🎯 O Que Será Gerado

- ✅ **11 capturas de tela** de alta qualidade (1920x1080)
- ✅ **Manual HTML profissional** pronto para conversão em PDF
- ✅ **Layout profissional** com capa, índice e seções formatadas
- ✅ **Todas as imagens** integradas automaticamente

## 📋 Pré-requisitos

1. Sistema Next.js rodando localmente
2. Banco de dados populado com dados de exemplo
3. Node.js 18+ instalado

## 🚀 Passo a Passo

### 1. Instalar Dependências

Se ainda não instalou o Puppeteer:

```bash
npm install
```

### 2. Iniciar o Sistema

Em um terminal, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Aguarde até ver a mensagem:
```
✓ Ready in X seconds
```

### 3. Gerar o Manual

Em **outro terminal**, execute o script de geração:

```bash
npm run generate-manual
```

### 4. Acompanhar o Processo

Você verá no terminal:

```
🚀 Iniciando geração de manual profissional com screenshots...
🔐 Realizando login...
📸 Capturando: Tela de Login do Sistema...
✅ Capturado: 01-login.png
📸 Capturando: Dashboard Principal - Visão Geral...
✅ Capturado: 02-dashboard-home.png
... (continua para todas as 11 telas)
📝 Gerando PDF profissional...
✅ Manual HTML gerado em: /public/manual-profissional.html
```

### 5. Visualizar o Manual

Abra no navegador:

```
http://localhost:3000/manual-profissional.html
```

### 6. Gerar o PDF Final

#### Opção A: Pelo Navegador (Recomendado)

1. Com o manual aberto no navegador
2. Pressione `Ctrl+P` (ou `Cmd+P` no Mac)
3. Em "Destino", selecione **"Salvar como PDF"**
4. Configure:
   - Margens: Padrão
   - Plano de fundo: ✅ Ativado (para manter cores)
   - Páginas: Todas
5. Clique em **"Salvar"**
6. Escolha o local e nome: `Manual-Usuario-Sistema-Absenteismo.pdf`

#### Opção B: Via Ferramenta Online

1. Acesse: https://www.html2pdf.app/
2. Faça upload do arquivo `public/manual-profissional.html`
3. Aguarde conversão
4. Baixe o PDF gerado

#### Opção C: Via wkhtmltopdf (Avançado)

Se tiver wkhtmltopdf instalado:

```bash
wkhtmltopdf --enable-local-file-access public/manual-profissional.html Manual-Usuario.pdf
```

## 📂 Arquivos Gerados

Após a execução, você terá:

```
public/
├── manual-profissional.html          # Manual completo em HTML
└── manual-screenshots/                # Pasta com screenshots
    ├── 01-login.png
    ├── 02-dashboard-home.png
    ├── 03-upload.png
    ├── 04-dashboard-analytics.png
    ├── 05-temporal.png
    ├── 06-cid-analysis.png
    ├── 07-patterns.png
    ├── 08-ai-assistant.png
    ├── 09-reports.png
    ├── 10-users.png
    └── 11-settings.png
```

## 🎨 Personalização

### Alterar Logo/Cores

Edite o arquivo `lib/generate-manual.ts`:

```typescript
// Linha ~300 - Mudar cores do tema
background: linear-gradient(135deg, #SUA_COR_1 0%, #SUA_COR_2 100%);

// Linha ~400 - Adicionar logo
<img src="/logo-orgao.png" alt="Logo" style="max-width: 300px;">
```

### Adicionar Mais Páginas

No array `pagesToCapture` (linha ~50):

```typescript
{
  url: '/dashboard/sua-pagina',
  name: '12-sua-pagina',
  description: 'Descrição da Página'
}
```

### Mudar Resolução das Screenshots

Linha ~18:

```typescript
defaultViewport: {
  width: 1920,  // Largura
  height: 1080  // Altura
}
```

## ⚠️ Troubleshooting

### Erro: "Target closed"

**Causa:** Sistema não carregou completamente

**Solução:** 
```typescript
// Aumente o timeout na linha ~75
await page.waitForTimeout(5000) // De 3000 para 5000
```

### Erro: "Navigation timeout"

**Causa:** Sistema muito lento para carregar

**Solução:**
```typescript
// No topo do arquivo
const browser = await puppeteer.launch({
  headless: 'new',
  timeout: 60000  // Adicionar timeout maior
})
```

### Screenshots em branco

**Causa:** Conteúdo dinâmico não carregou

**Solução:**
```typescript
// Aguardar elemento específico antes do screenshot
await page.waitForSelector('.seu-elemento', { timeout: 10000 })
```

### Erro de login

**Causa:** Credenciais incorretas

**Solução:** Verifique se o seed foi executado:
```bash
npm run db:seed
```

Credenciais padrão:
- Email: `admin@sistema.com`
- Senha: `admin123`

## 📊 Qualidade das Imagens

- **Resolução:** 1920x1080 (Full HD)
- **Formato:** PNG com compressão lossless
- **Tamanho médio:** 200-500 KB por screenshot
- **DPI:** 96 (padrão web, adequado para PDF)

## 🔄 Re-gerar Manual

Para atualizar o manual após mudanças no sistema:

```bash
# Limpar screenshots antigos
rm -rf public/manual-screenshots

# Gerar novamente
npm run generate-manual
```

## 💡 Dicas Profissionais

### 1. Temas Claro e Escuro

Gere duas versões do manual:

```typescript
// Capturar em modo escuro
await page.emulateMediaFeatures([
  { name: 'prefers-color-scheme', value: 'dark' }
])
```

### 2. Destacar Elementos

Adicione anotações visuais:

```typescript
// Após navegar para a página
await page.evaluate(() => {
  const element = document.querySelector('.seu-botao')
  element.style.border = '3px solid red'
  element.style.boxShadow = '0 0 10px red'
})
await page.screenshot(...)
```

### 3. Múltiplos Idiomas

```bash
# Gerar em português
LANGUAGE=pt npm run generate-manual

# Gerar em inglês
LANGUAGE=en npm run generate-manual
```

## 📧 Suporte

Problemas ao gerar o manual? 

1. Verifique se o sistema está rodando: `http://localhost:3000`
2. Verifique logs do console
3. Teste manualmente o login no navegador
4. Contate o suporte técnico

---

**Resultado Final:** Manual profissional em PDF com ~20 páginas, capturas de tela reais, formatação de qualidade e pronto para distribuição! 🎉
