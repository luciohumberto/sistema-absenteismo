# 🚀 Guia de Deploy na Vercel

Este guia explica como fazer o deploy do Sistema de Análise de Absenteísmo na Vercel (plataforma gratuita).

## Pré-requisitos

- Conta no GitHub
- Conta na Vercel (https://vercel.com)
- Conta em um provedor de PostgreSQL (Vercel Postgres, Supabase ou Neon)
- Conta na OpenAI (para funcionalidades de IA)

---

## Passo 1: Preparar Repositório no GitHub

### 1.1 Criar Repositório

```bash
# No seu projeto local
git init
git add .
git commit -m "Initial commit: Sistema de Análise de Absenteísmo"
```

### 1.2 Criar repositório no GitHub

1. Acesse https://github.com/new
2. Nome: `sistema-absenteismo`
3. Descrição: "Sistema Web de Análise de Absenteísmo-Doença"
4. Visibilidade: Private (recomendado)
5. Clique em "Create repository"

### 1.3 Fazer Push

```bash
git remote add origin https://github.com/seu-usuario/sistema-absenteismo.git
git branch -M main
git push -u origin main
```

---

## Passo 2: Configurar Banco de Dados

### Opção A: Vercel Postgres (Recomendado)

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Criar Banco de Dados**
   ```bash
   vercel postgres create
   ```
   - Nome: `absenteismo-db`
   - Região: `Washington, D.C., USA (iad1)` (mais próximo do Brasil)

4. **Obter Connection String**
   ```bash
   vercel env pull .env.local
   ```
   Isso criará um arquivo `.env.local` com a `DATABASE_URL`

### Opção B: Supabase (Gratuito)

1. Acesse https://supabase.com
2. Crie novo projeto
3. Nome: `sistema-absenteismo`
4. Senha do banco: Crie uma senha forte
5. Região: `South America (São Paulo)`
6. Aguarde criação (~2 minutos)
7. Vá em Settings → Database
8. Copie a "Connection string" (modo Pooling)
9. Substitua `[YOUR-PASSWORD]` pela senha

Connection string exemplo:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
```

### Opção C: Neon (Gratuito)

1. Acesse https://neon.tech
2. Clique em "Sign up"
3. Crie novo projeto
4. Nome: `sistema-absenteismo`
5. Região: `AWS / South America (São Paulo)`
6. Copie a connection string

---

## Passo 3: Obter API Key da OpenAI

1. Acesse https://platform.openai.com/api-keys
2. Clique em "Create new secret key"
3. Nome: `Sistema Absenteísmo`
4. Copie a chave (começa com `sk-`)
5. ⚠️ **IMPORTANTE**: Guarde em local seguro, não aparecerá novamente!

### Custos OpenAI

- **Modelo GPT-4**: ~$0.03 por análise
- **Uso estimado**: $5-10/mês para uso moderado
- **Alternativa**: Use GPT-3.5-turbo (mais barato) no código

Para usar GPT-3.5 (mais barato), modifique:
```typescript
// Em app/api/ai/analyze/route.ts
model: 'gpt-3.5-turbo' // ao invés de 'gpt-4'
```

---

## Passo 4: Deploy na Vercel

### 4.1 Conectar Repositório

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New..." → "Project"
3. Importe seu repositório do GitHub
4. Selecione `sistema-absenteismo`

### 4.2 Configurar Variáveis de Ambiente

Na tela de configuração, adicione as variáveis:

```env
# Database
DATABASE_URL=sua-connection-string-aqui

# NextAuth
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=cole-aqui-secret-gerado

# OpenAI
OPENAI_API_KEY=sk-sua-chave-aqui

# Opcional
NODE_ENV=production
```

#### Como gerar NEXTAUTH_SECRET:

```bash
# No terminal
openssl rand -base64 32
```

Ou use: https://generate-secret.vercel.app/32

### 4.3 Configurações do Build

Vercel detecta automaticamente, mas confirme:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4.4 Deploy

1. Clique em "Deploy"
2. Aguarde build (3-5 minutos)
3. ✅ Deploy concluído!

---

## Passo 5: Configurar Banco de Dados

### 5.1 Executar Migrations

Após o deploy, você precisa criar as tabelas:

**Opção A: Via Vercel CLI (Recomendado)**

```bash
# Conectar ao projeto
vercel link

# Executar migrations
vercel env pull .env.local
npx prisma db push

# Popular com dados de exemplo (opcional)
npx prisma db seed
```

**Opção B: Manualmente via Prisma Studio**

```bash
# Local, com .env.local configurado
npx prisma studio
```

Ou acesse seu provedor (Supabase/Neon) e execute o SQL do schema.

### 5.2 Criar Usuário Administrador

Execute via Prisma Studio ou SQL direto:

```sql
-- Substitua o hash da senha
-- Senha padrão 'admin123' já hashada:
INSERT INTO users (id, name, email, password, role, "createdAt", "updatedAt") 
VALUES (
  'admin-user-id-001',
  'Administrador',
  'admin@sistema.com',
  '$2a$10$YourHashedPasswordHere',
  'ADMIN',
  NOW(),
  NOW()
);
```

Para gerar hash da senha:

```javascript
// No Node.js console
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('sua-senha-aqui', 10);
console.log(hash);
```

---

## Passo 6: Verificar Deploy

### 6.1 Acessar Sistema

1. URL: `https://seu-projeto.vercel.app`
2. Faça login com:
   - Email: `admin@sistema.com`
   - Senha: `admin123`

### 6.2 Testar Funcionalidades

✅ **Login funciona**
✅ **Dashboard carrega**
✅ **Upload aceita arquivos**
✅ **Gráficos renderizam**
✅ **IA responde** (se configurou OpenAI)
✅ **Tema claro/escuro**

### 6.3 Possíveis Erros

**Erro: "Database connection failed"**
- Verifique DATABASE_URL nas env vars
- Confirme que o banco está acessível externamente
- Teste connection string localmente primeiro

**Erro: "NextAuth configuration error"**
- Verifique NEXTAUTH_URL (deve ser URL completa)
- Verifique NEXTAUTH_SECRET (deve ter 32+ caracteres)

**Erro: "OpenAI API error"**
- Verifique se a key está correta
- Confirme saldo na conta OpenAI
- A funcionalidade tem fallback se não configurada

---

## Passo 7: Configurações Pós-Deploy

### 7.1 Domínio Personalizado (Opcional)

1. Na Vercel, vá em Settings → Domains
2. Adicione seu domínio: `sistema.suaempresa.com.br`
3. Configure DNS conforme instruções
4. Atualize `NEXTAUTH_URL` para novo domínio

### 7.2 Configurar Limites

**Vercel (Plano Hobby - Grátis):**
- ✅ 100 GB bandwidth/mês
- ✅ Builds ilimitados
- ✅ Domínios customizados ilimitados
- ⚠️ Serverless functions: 10s timeout
- ⚠️ 100 GB-hours execução/mês

Para aumentar limites, upgrade para Pro ($20/mês).

### 7.3 Monitoramento

**Analytics (Opcional)**

1. Na Vercel, ative Analytics
2. Veja métricas de:
   - Pageviews
   - Tempo de carregamento
   - Core Web Vitals

**Logs**

Acesse logs em tempo real:
```bash
vercel logs seu-projeto.vercel.app
```

Ou no dashboard: Deployments → Logs

---

## Passo 8: Backup e Segurança

### 8.1 Backup do Banco

**Vercel Postgres:**
```bash
vercel postgres backup create
vercel postgres backup list
```

**Supabase:**
- Backups automáticos diários
- Acesse em Database → Backups

**Neon:**
- Backups automáticos
- Point-in-time restore disponível

### 8.2 Segurança

**Alterar Senhas Padrão:**
```sql
-- No banco, altere senha do admin
UPDATE users 
SET password = '$2a$10$NovoHashAqui'
WHERE email = 'admin@sistema.com';
```

**Rate Limiting (Opcional):**

Adicione ao `next.config.js`:
```javascript
experimental: {
  middleware: true,
}
```

**CORS (se necessário):**
```javascript
// Em next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://seu-dominio.com' },
      ],
    },
  ]
}
```

---

## Passo 9: Atualizar Sistema

### 9.1 Deploy de Atualizações

```bash
# Fazer alterações no código
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

Vercel faz deploy automático a cada push!

### 9.2 Rollback (se necessário)

1. Na Vercel, vá em Deployments
2. Encontre deploy anterior
3. Clique em ⋯ → "Promote to Production"

### 9.3 Preview Deployments

Crie branch para testar:
```bash
git checkout -b feature/nova-funcionalidade
git push origin feature/nova-funcionalidade
```

Vercel cria URL de preview automaticamente!

---

## Troubleshooting

### Build Falha

**Erro: "Module not found"**
```bash
# Local
npm install
npm run build

# Se funcionar local, problema está em cache da Vercel
# Na Vercel: Settings → General → Clear Cache
```

**Erro: "TypeScript errors"**
```bash
# Corrigir erros
npm run lint
npx tsc --noEmit
```

### Runtime Errors

**Function Timeout**
- Limite: 10s (Hobby) / 60s (Pro)
- Otimize queries no banco
- Use paginação
- Cache resultados

**Memory Limit**
- Limite: 1024 MB (Hobby) / 3008 MB (Pro)
- Processe arquivos em chunks
- Limite tamanho de upload

### Database Issues

**Too many connections**
- Use connection pooling
- Supabase: Use pooling URL (porta 6543)
- Configure em `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Se disponível
}
```

---

## Custos Estimados

### Plataforma (Mensal)

- **Vercel Hobby**: GRÁTIS ✅
- **Vercel Pro**: $20 (se precisar mais recursos)

### Banco de Dados (Mensal)

- **Vercel Postgres**: $0.25/GB (~$3-5)
- **Supabase Free**: GRÁTIS até 500MB ✅
- **Neon Free**: GRÁTIS até 3GB ✅

### OpenAI (Mensal)

- **Uso leve**: $5-10
- **Uso moderado**: $20-50
- **Uso intenso**: $100+

**💡 Dica**: Use GPT-3.5-turbo para reduzir custos em 90%!

### TOTAL Estimado

- **Mínimo**: GRÁTIS (sem OpenAI)
- **Recomendado**: $10-20/mês
- **Com recursos extras**: $30-50/mês

---

## Próximos Passos

1. ✅ Personalizar logo e cores
2. ✅ Configurar domínio próprio
3. ✅ Criar usuários para equipe
4. ✅ Fazer primeiro upload de dados
5. ✅ Configurar backups automáticos
6. ✅ Treinar equipe no uso do sistema
7. ✅ Monitorar performance e custos

---

## Recursos Úteis

- **Documentação Vercel**: https://vercel.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Neon Docs**: https://neon.tech/docs
- **OpenAI Docs**: https://platform.openai.com/docs

---

## Suporte

**Problemas com o deploy?**
- GitHub Issues: https://github.com/seu-usuario/sistema-absenteismo/issues
- Email: suporte@sistema.com

**Problemas com a Vercel?**
- Suporte Vercel: https://vercel.com/support

---

✅ **Parabéns! Seu sistema está no ar!** 🎉

Acesse: `https://seu-projeto.vercel.app`
