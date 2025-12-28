# ⚡ Guia de Início Rápido

## 🚀 Em 5 Minutos

### 1. Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/sistema-absenteismo.git
cd sistema-absenteismo

# Instalar dependências
npm install
```

### 2. Configurar Banco de Dados

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o `.env` e configure a `DATABASE_URL`. Opções gratuitas:

**Supabase** (Recomendado para começar):
```env
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.xxx.supabase.co:5432/postgres"
```

**Neon**:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]"
```

### 3. Criar Banco e Popular

```bash
# Criar tabelas
npx prisma db push

# Popular com dados de exemplo
npm run db:seed
```

### 4. Iniciar

```bash
npm run dev
```

Acesse: **http://localhost:3000**

Login:
- **Email**: admin@sistema.com
- **Senha**: admin123

---

## 📋 Checklist de Configuração

- [ ] Node.js 18+ instalado
- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` criado e configurado
- [ ] Banco de dados criado (`npx prisma db push`)
- [ ] Dados de exemplo carregados (`npm run db:seed`)
- [ ] Servidor rodando (`npm run dev`)
- [ ] Login funcionando
- [ ] Dashboard carregando

---

## 🎯 Primeiros Passos no Sistema

### 1. Explorar Dashboard Inicial
- Visualize os dados de exemplo
- Navegue pelos diferentes cards
- Clique nos gráficos para interagir

### 2. Testar Upload
- Vá em "Upload de Dados"
- Use o arquivo de exemplo em `/docs/exemplo_dados.xlsx`
- Veja o processamento automático

### 3. Experimentar IA
- Acesse "Assistente IA"
- Faça perguntas sobre os dados
- Experimente: "Quais são as principais tendências?"

### 4. Gerar Relatório
- Vá em "Relatórios"
- Clique em "Resumo Executivo"
- Escolha PDF e baixe

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor de desenvolvimento
npm run build            # Build para produção
npm start                # Iniciar em modo produção

# Banco de Dados
npm run db:push          # Aplicar schema ao banco
npm run db:seed          # Popular com dados de exemplo
npm run db:studio        # Abrir Prisma Studio (interface visual)
npm run db:reset         # Resetar banco e repopular

# Qualidade de Código
npm run lint             # Verificar código
npx tsc --noEmit        # Verificar TypeScript
```

---

## 📁 Estrutura do Projeto

```
sistema-absenteismo/
├── app/                    # Páginas Next.js (App Router)
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   ├── dashboard/         # Páginas do dashboard
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   └── ui/               # Componentes de UI
├── lib/                   # Utilitários e helpers
├── prisma/               # Schema e migrations do banco
│   ├── schema.prisma     # Definição do schema
│   └── seed.ts           # Dados de exemplo
├── docs/                 # Documentação
│   ├── MANUAL_USUARIO.md # Manual completo
│   └── DEPLOY.md         # Guia de deploy
└── public/               # Arquivos estáticos
```

---

## 🎨 Personalização Rápida

### Alterar Cores Principais

Em `app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Azul padrão */
}

/* Mudando para verde: */
:root {
  --primary: 142.1 76.2% 36.3%;  /* Verde */
}
```

### Adicionar Logo

1. Coloque logo em `public/logo.png`
2. Edite componentes para usar: `/logo.png`

### Alterar Nome do Sistema

Busque e substitua "Sistema de Análise" pelo nome desejado

---

## 🐛 Problemas Comuns

### Erro: "Can't connect to database"

**Solução:**
1. Verifique se DATABASE_URL está correta
2. Teste conexão: `npx prisma db push`
3. Veja logs do provedor de banco

### Erro: "Module not found"

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já em uso

**Solução:**
```bash
# Usar porta diferente
PORT=3001 npm run dev
```

### Build falha

**Solução:**
```bash
# Limpar cache
rm -rf .next
npm run build
```

---

## 📚 Próximos Passos

1. **Ler Manual Completo**: `docs/MANUAL_USUARIO.md`
2. **Configurar OpenAI**: Para funcionalidades de IA
3. **Fazer Deploy**: Seguir `docs/DEPLOY.md`
4. **Criar Usuários**: Para sua equipe
5. **Fazer Backup**: Configurar backups automáticos

---

## 🆘 Precisa de Ajuda?

- 📖 **Manual Completo**: [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
- 🚀 **Guia de Deploy**: [DEPLOY.md](./DEPLOY.md)
- 📘 **README Principal**: [README.md](../README.md)
- 🐛 **Issues**: https://github.com/seu-usuario/sistema-absenteismo/issues

---

## ✨ Dicas Pro

1. **Use Prisma Studio** para ver/editar dados visualmente
   ```bash
   npm run db:studio
   ```

2. **Ative Hot Reload** - Código atualiza automaticamente em dev

3. **Use DevTools** - F12 no navegador para debug

4. **Explore API** - Endpoints em `app/api/`

5. **Customize Tema** - Suporta claro/escuro automaticamente

---

**Pronto! Sistema funcionando em 5 minutos!** 🎉

Explore, teste e personalize conforme necessário.
