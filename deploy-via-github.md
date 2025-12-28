# 🚀 Deploy via GitHub (SEM instalar nada!)

Como você já está conectado na Vercel via GitHub, vamos fazer o deploy direto pelo navegador - **MUITO MAIS FÁCIL!**

---

## ✅ PASSO 1: Subir Código para GitHub (2 minutos)

### Via Interface Web do GitHub (Mais Fácil):

1. **Criar repositório:**
   - Acesse: https://github.com/new
   - Nome: `sistema-absenteismo`
   - Deixe **PUBLIC**
   - Clique **"Create repository"**

2. **Upload dos arquivos:**
   - Na página do repositório criado
   - Clique em **"uploading an existing file"**
   - Arraste TODA a pasta `c:\Users\Lucio\GITHUB` para o navegador
   - Ou clique **"choose your files"** e selecione tudo
   - Clique **"Commit changes"**

---

## ✅ PASSO 2: Criar Banco de Dados (1 minuto)

### Opção Rápida - Neon:

1. Acesse: https://neon.tech
2. Clique **"Sign Up"** → **"Continue with GitHub"** (você já está logado)
3. **"Create Project"**
4. Nome: `absenteismo`
5. Região: **US East (Ohio)**
6. Clique **"Create Project"**
7. **COPIE** a Connection String (exemplo abaixo):

```
postgresql://usuario:senha@ep-cool-sun-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**⚠️ GUARDE ESSA STRING!** Você vai colar em breve.

---

## ✅ PASSO 3: Deploy na Vercel (2 minutos)

1. **Ir para Vercel:**
   - Acesse: https://vercel.com/new
   - Você já está logado! ✅

2. **Importar Repositório:**
   - Clique em **"Import Git Repository"**
   - Você verá `sistema-absenteismo` na lista
   - Clique **"Import"**

3. **Configurar Projeto:**
   - Nome do projeto: deixe como está
   - Framework: **Next.js** (já detectado)
   - Root Directory: `./` (padrão)

4. **IMPORTANTE - Adicionar Variáveis de Ambiente:**
   
   Clique em **"Environment Variables"** e adicione uma por uma:

   **Variável 1:**
   - Name: `DATABASE_URL`
   - Value: *Cole aqui a Connection String do Neon*
   
   **Variável 2:**
   - Name: `NEXTAUTH_SECRET`
   - Value: `vZLmH8UXN3KR9jP2tFqWnYbC5xDe7aGkPn4sLtJwQx`
   
   **Variável 3:**
   - Name: `NEXTAUTH_URL`
   - Value: `https://SEU-PROJETO.vercel.app`
   - *(Exemplo: `https://sistema-absenteismo.vercel.app`)*
   - *(Use o nome que aparece acima na tela)*
   
   **Variável 4 (Opcional):**
   - Name: `OPENAI_API_KEY`
   - Value: *Cole sua chave OpenAI se tiver (ou deixe em branco)*

5. **Iniciar Deploy:**
   - Clique em **"Deploy"**
   - Aguarde 2-3 minutos ☕
   - Você verá: "🎉 Congratulations!"

6. **Copiar URL:**
   - Clique no botão **"Visit"** ou copie a URL
   - Exemplo: `https://sistema-absenteismo.vercel.app`

---

## ✅ PASSO 4: Configurar Banco de Dados (30 segundos)

Agora que o sistema está no ar, precisamos criar as tabelas:

1. **Na página da Vercel, após o deploy:**
   - Clique no nome do seu projeto (topo esquerdo)
   - Vá em **"Settings"** (menu lateral)
   - Role até **"Environment Variables"**
   - Verifique se todas as 3-4 variáveis estão lá
   
2. **Forçar novo deploy para criar tabelas:**
   - Clique em **"Deployments"** (menu lateral)
   - Clique no deployment mais recente (tem ✓ verde)
   - Clique nos **três pontinhos (...)** no canto direito
   - Clique em **"Redeploy"**
   - Marque **"Use existing Build Cache"** (opcional)
   - Clique **"Redeploy"**
   
3. **Aguarde 1-2 minutos**
   - O Prisma criará as tabelas automaticamente
   - O seed criará o usuário administrador

---

## ✅ PASSO 5: Acessar o Sistema! 🎉

### 🌐 URL do Sistema:
```
https://sistema-absenteismo.vercel.app
```
*(ou a URL que você copiou)*

### 👤 Credenciais de Administrador:
```
Email: admin@sistema.com
Senha: Admin@123
```

---

## 🔧 Se Algo Der Errado

### ❌ "Build Failed"

1. Clique no deployment falhado
2. Veja os logs de erro
3. Provavelmente é variável de ambiente incorreta
4. Volte em **Settings** → **Environment Variables**
5. Verifique se `DATABASE_URL` está correta e tem `?sslmode=require` no final

### ❌ "Login não funciona"

O banco ainda não tem o usuário. Para criar:

1. Vá em: https://console.neon.tech
2. Clique no seu projeto
3. Clique em **"SQL Editor"**
4. Cole e execute este SQL:

```sql
-- Criar usuário administrador
INSERT INTO "User" (id, email, password, name, role, "emailVerified", image, "createdAt", "updatedAt", "allowedDepartments")
VALUES (
  'admin123',
  'admin@sistema.com',
  '$2a$10$YourHashedPasswordHere',
  'Administrador',
  'ADMIN',
  NOW(),
  NULL,
  NOW(),
  NOW(),
  '{}'
);
```

**Ou use a senha já hasheada:**
```sql
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt", "allowedDepartments")
VALUES (
  'admin-' || gen_random_uuid()::text,
  'admin@sistema.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxNzM6sfG',
  'Administrador',
  'ADMIN',
  NOW(),
  NOW(),
  '{}'
);
```

### ❌ "Internal Server Error"

1. Vercel → Seu Projeto → **"Deployments"**
2. Clique no deployment atual
3. Vá em **"Functions"** tab
4. Veja os logs de erro das funções
5. Geralmente é erro de conexão com banco

### ❌ Página em branco ou erro 404

1. Certifique-se que acessou: `https://SEU-PROJETO.vercel.app` (não localhost)
2. Limpe cache do navegador (Ctrl+Shift+Del)
3. Tente em janela anônima

---

## 🎨 Personalizar Domínio (Opcional)

Quer um domínio tipo `absenteismo.com.br`?

1. Na Vercel, vá no projeto
2. **Settings** → **Domains**
3. Clique **"Add"**
4. Digite seu domínio
5. Configure DNS no seu provedor

**Ou use o domínio gratuito `.vercel.app`!**

---

## 📊 Monitorar o Sistema

Na Vercel você pode ver:
- **Analytics:** Quantos acessos
- **Logs:** Erros em tempo real
- **Speed Insights:** Performance

Tudo em: https://vercel.com/dashboard

---

## ✅ CHECKLIST RÁPIDO

- [ ] Repositório GitHub criado
- [ ] Arquivos enviados para GitHub
- [ ] Banco Neon criado
- [ ] Connection String copiada
- [ ] Projeto importado na Vercel
- [ ] 4 variáveis de ambiente configuradas
- [ ] Deploy finalizado com sucesso
- [ ] Segundo deploy executado (para criar tabelas)
- [ ] Sistema acessível online
- [ ] Login funcionando

---

## 🎉 PRONTO!

Seu sistema está **ONLINE** e **FUNCIONANDO**!

Agora:
1. ✅ Acesse a URL
2. ✅ Faça login
3. ✅ Altere a senha em **Configurações**
4. ✅ Crie usuários em **Usuários**
5. ✅ Faça upload de dados em **Upload**
6. ✅ Explore os **Dashboards**

**Bom uso! 📊**
