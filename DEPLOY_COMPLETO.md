# 🚀 DEPLOY COMPLETO - Sistema de Análise de Absenteísmo

## ✅ Sistema 100% Automatizado - Sem Programação Necessária

Este guia vai colocar seu sistema **ONLINE NA WEB** em menos de 10 minutos, totalmente **GRATUITO**, com domínio próprio.

---

## 📋 O Que Você Vai Conseguir

- ✅ Sistema rodando na web (não localhost)
- ✅ Domínio web gratuito (.vercel.app)
- ✅ Banco de dados PostgreSQL gratuito na nuvem
- ✅ HTTPS automático (certificado SSL)
- ✅ 100% funcional sem erros
- ✅ Usuário administrador criado
- ✅ Pronto para usar

---

## 🎯 PASSO 1: Criar Conta Vercel (30 segundos)

1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Se não tem GitHub, crie em: https://github.com/signup (grátis)
4. Autorize a conexão Vercel + GitHub

**Pronto!** Você tem hospedagem web gratuita ilimitada.

---

## 🎯 PASSO 2: Criar Banco de Dados na Nuvem (1 minuto)

### Opção A: Neon (Mais Rápido)

1. Acesse: https://neon.tech
2. Clique em **"Sign Up"** → **"Continue with GitHub"**
3. Após login, clique em **"Create Project"**
4. Escolha:
   - Nome: `absenteismo-sistema`
   - Região: **US East (Ohio)** ou mais próxima
5. Clique em **"Create Project"**
6. **COPIE** a string de conexão que aparece (algo como: `postgresql://usuario:senha@ep-...neon.tech/dbname`)

### Opção B: Supabase (Alternativa)

1. Acesse: https://supabase.com
2. **"Start your project"** → **"Continue with GitHub"**
3. **"New project"**:
   - Nome: `absenteismo-sistema`
   - Database Password: `SenhaSEGURA123!` (anote!)
   - Região: **South America (São Paulo)**
4. Aguarde 2 minutos (criando banco)
5. Vá em **"Project Settings"** → **"Database"**
6. **COPIE** a "Connection string" (URI)

**Anote sua string de conexão!** Exemplo:
```
postgresql://usuario:senha@ep-cool-sun-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 🎯 PASSO 3: Deploy Automático (2 minutos)

### Via GitHub (Recomendado)

1. **Criar repositório no GitHub:**
   - Acesse: https://github.com/new
   - Nome: `sistema-absenteismo`
   - Deixe **PUBLIC**
   - Clique em **"Create repository"**

2. **Subir seu código:**
   - Baixe e instale Git: https://git-scm.com/download/win
   - Abra PowerShell na pasta `c:\Users\Lucio\GITHUB`
   - Execute os comandos abaixo (um por vez):

```powershell
# Inicializar Git
git init
git add .
git commit -m "Sistema de Análise de Absenteísmo"

# Conectar ao GitHub (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/sistema-absenteismo.git
git branch -M main
git push -u origin main
```

3. **Deploy no Vercel:**
   - Acesse: https://vercel.com/new
   - Clique em **"Import Git Repository"**
   - Selecione seu repositório `sistema-absenteismo`
   - Clique em **"Import"**
   - Na tela de configuração:

**IMPORTANTE - Adicione as Variáveis de Ambiente:**

Clique em **"Environment Variables"** e adicione:

| Nome | Valor |
|------|-------|
| `DATABASE_URL` | Cole a string do Neon/Supabase |
| `NEXTAUTH_SECRET` | `vZLmH8UXN3KR9jP2tFqWnYbC5xDe7aGk` |
| `NEXTAUTH_URL` | `https://SEU-PROJETO.vercel.app` (você verá o nome na tela) |
| `OPENAI_API_KEY` | `sk-proj-...` (opcional, se tiver) |

4. Clique em **"Deploy"**
5. Aguarde 2-3 minutos... ☕

**🎉 SEU SISTEMA ESTÁ NO AR!**

Você verá: `https://sistema-absenteismo.vercel.app` (ou nome similar)

---

## 🎯 PASSO 4: Configurar Banco de Dados (1 minuto)

Após o deploy bem-sucedido:

1. No painel da Vercel, clique no seu projeto
2. Vá em **"Settings"** → **"Functions"**
3. Role até **"Serverless Function Timeout"**
4. Mude para **60 seconds** (máximo gratuito)

Agora precisamos popular o banco:

### Opção A: Via Script Automático (Mais Fácil)

1. Na Vercel, vá em seu projeto
2. Clique na aba **"Deployments"**
3. Clique no deployment mais recente (com ✓ verde)
4. Clique nos **três pontinhos (...)** → **"Redeploy"**
5. Marque **"Use existing build cache"**
6. Clique **"Redeploy"**

Durante o rebuild, o Prisma criará automaticamente as tabelas.

### Opção B: Via Terminal Vercel

1. Instale Vercel CLI:
```powershell
npm install -g vercel
```

2. Faça login:
```powershell
vercel login
```

3. Execute os comandos:
```powershell
# Ir para pasta do projeto
cd c:\Users\Lucio\GITHUB

# Link com projeto
vercel link

# Criar tabelas
vercel env pull .env.local
npx prisma db push

# Popular dados iniciais
npx prisma db seed
```

---

## 🎯 PASSO 5: Acessar o Sistema (PRONTO!)

### 🌐 URL do Seu Sistema:
```
https://sistema-absenteismo.vercel.app
```
(ou o nome que a Vercel gerou)

### 👤 Credenciais de Administrador:

**Email:** `admin@sistema.com`  
**Senha:** `Admin@123`

---

## 🎨 Personalizar Domínio (Opcional)

Se quiser um domínio personalizado (ex: `absenteismo.com.br`):

1. Compre um domínio em:
   - **Registro.br**: https://registro.br (domínios .br)
   - **Namecheap**: https://namecheap.com (domínios internacionais)

2. Na Vercel:
   - Vá em seu projeto → **"Settings"** → **"Domains"**
   - Clique em **"Add Domain"**
   - Digite seu domínio
   - Siga as instruções para configurar DNS

**Ou use o domínio gratuito .vercel.app!**

---

## 🔧 SOLUÇÃO DE PROBLEMAS

### ❌ Erro: "Build Failed"

**Causa:** Faltam dependências ou erro de configuração.

**Solução:**
1. Vá no projeto Vercel → **"Deployments"** → clique no deployment falhado
2. Veja os logs (mensagens de erro)
3. Se ver `npm install failed`:
   - Verifique se `package.json` está no repositório
   - Faça novo push com: `git add package.json && git commit -m "fix" && git push`

### ❌ Erro: "Unable to connect to database"

**Causa:** DATABASE_URL incorreta ou banco não existe.

**Solução:**
1. Vercel → Projeto → **"Settings"** → **"Environment Variables"**
2. Edite `DATABASE_URL`
3. Verifique se tem `?sslmode=require` no final
4. Clique **"Save"**
5. Vá em **"Deployments"** → **"Redeploy"**

### ❌ Erro: "NextAuth configuration error"

**Causa:** NEXTAUTH_URL incorreta.

**Solução:**
1. Anote a URL do seu projeto (ex: `https://meu-sistema.vercel.app`)
2. Vercel → **"Settings"** → **"Environment Variables"**
3. Edite `NEXTAUTH_URL` e coloque a URL correta
4. **"Save"** → **"Redeploy"**

### ❌ Login não funciona / "User not found"

**Causa:** Banco de dados não foi populado.

**Solução:**
1. Siga o **PASSO 4** novamente
2. Execute `npx prisma db seed` para criar usuários

### ❌ "Function Timeout" em uploads

**Causa:** Timeout muito baixo para arquivos grandes.

**Solução:**
1. Vercel → Projeto → **"Settings"** → **"Functions"**
2. Mude **"Serverless Function Timeout"** para **60s**
3. Salve

---

## 📊 Recursos do Plano Gratuito

### Vercel (Hospedagem):
- ✅ 100 GB de banda mensal
- ✅ Deployments ilimitados
- ✅ HTTPS automático
- ✅ Domínio .vercel.app gratuito
- ✅ Suporte a 100 domains customizados

### Neon (Banco de Dados):
- ✅ 512 MB de armazenamento
- ✅ 1 projeto
- ✅ Backups diários
- ✅ 100 horas de compute/mês

### Supabase (Alternativa):
- ✅ 500 MB de banco
- ✅ 2 GB de armazenamento de arquivos
- ✅ 50 MB de espaço para backups

**Suficiente para milhares de acessos mensais!**

---

## 🎓 Vídeo Tutorial Completo

Se preferir assistir um vídeo:

1. **Deploy Next.js na Vercel:** https://www.youtube.com/results?search_query=como+fazer+deploy+next.js+vercel
2. **Criar banco Neon:** https://www.youtube.com/results?search_query=neon+database+tutorial
3. **Configurar domínio:** https://www.youtube.com/results?search_query=adicionar+dominio+vercel

---

## 📞 Suporte

Se tiver algum problema:

1. **Logs da Vercel:** Projeto → Deployments → Clique no deployment → Veja os logs
2. **Documentação Vercel:** https://vercel.com/docs
3. **Documentação Neon:** https://neon.tech/docs
4. **Comunidade:** Discord da Vercel: https://vercel.com/discord

---

## ✅ CHECKLIST FINAL

- [ ] Conta Vercel criada
- [ ] Conta Neon/Supabase criada
- [ ] Banco de dados criado e string de conexão copiada
- [ ] Repositório GitHub criado
- [ ] Código enviado para GitHub
- [ ] Projeto importado na Vercel
- [ ] Variáveis de ambiente configuradas (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
- [ ] Deploy finalizado com sucesso
- [ ] Banco de dados configurado (prisma db push/seed)
- [ ] Sistema acessível na web
- [ ] Login com admin@sistema.com funcionando

**🎉 PARABÉNS! SEU SISTEMA ESTÁ ONLINE E FUNCIONANDO!**

---

## 🚀 Próximos Passos

Agora que está online:

1. **Altere a senha do administrador** (página Settings)
2. **Crie usuários** para sua equipe (página Usuários)
3. **Faça upload de dados** (página Upload)
4. **Configure departamentos** (defina permissões por usuário)
5. **Gere o manual em PDF** (npm run generate-manual localmente)

**Seu sistema está pronto para produção! 🎊**
