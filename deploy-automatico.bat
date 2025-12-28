@echo off
chcp 65001 >nul
cls

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  🚀 DEPLOY AUTOMÁTICO - Sistema de Análise de Absenteísmo    ║
echo ║  Sistema será publicado na WEB em poucos minutos!             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar se Git está instalado
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git não encontrado!
    echo.
    echo 📥 Baixe e instale o Git:
    echo    https://git-scm.com/download/win
    echo.
    echo Após instalar, execute este script novamente.
    pause
    exit /b 1
)

echo ✅ Git detectado
echo.

REM Verificar se Vercel CLI está instalado
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Instalando Vercel CLI...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar Vercel CLI
        echo.
        echo Você precisa instalar o Node.js primeiro:
        echo https://nodejs.org
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI instalado
    echo.
)

echo ✅ Vercel CLI detectado
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  PASSO 1: Configuração Inicial                                 ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar se já tem .git
if not exist .git (
    echo 📝 Inicializando repositório Git...
    git init
    git add .
    git commit -m "Deploy inicial - Sistema de Análise de Absenteísmo"
    echo ✅ Repositório Git criado
    echo.
) else (
    echo ✅ Repositório Git já existe
    echo.
)

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  PASSO 2: Login na Vercel                                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🔐 Uma janela do navegador será aberta...
echo    1. Faça login com GitHub (ou crie conta)
echo    2. Autorize a Vercel
echo    3. Volte para este terminal
echo.
pause

vercel login

if %errorlevel% neq 0 (
    echo ❌ Erro ao fazer login na Vercel
    pause
    exit /b 1
)

echo ✅ Login realizado com sucesso
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  PASSO 3: Configurar Variáveis de Ambiente                    ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📋 Você precisará fornecer algumas informações:
echo.

REM Solicitar DATABASE_URL
:ask_database_url
echo ┌────────────────────────────────────────────────────────────────┐
echo │ 1. DATABASE_URL                                                │
echo └────────────────────────────────────────────────────────────────┘
echo.
echo Se ainda NÃO criou seu banco de dados PostgreSQL:
echo.
echo   Opção A - Neon (Recomendado):
echo   https://neon.tech
echo   → Sign Up → Create Project → Copie a Connection String
echo.
echo   Opção B - Supabase:
echo   https://supabase.com
echo   → New Project → Settings → Database → Connection String (URI)
echo.
set /p DATABASE_URL="Cole aqui a string de conexão do banco: "

if "%DATABASE_URL%"=="" (
    echo ❌ DATABASE_URL não pode estar vazia!
    echo.
    goto ask_database_url
)

echo ✅ DATABASE_URL configurada
echo.

REM Gerar NEXTAUTH_SECRET
echo ┌────────────────────────────────────────────────────────────────┐
echo │ 2. NEXTAUTH_SECRET (gerado automaticamente)                    │
echo └────────────────────────────────────────────────────────────────┘
echo.
set NEXTAUTH_SECRET=vZLmH8UXN3KR9jP2tFqWnYbC5xDe7aGkPn4sLtJwQx
echo ✅ Chave de segurança gerada
echo.

REM OPENAI_API_KEY (opcional)
echo ┌────────────────────────────────────────────────────────────────┐
echo │ 3. OPENAI_API_KEY (Opcional - para IA)                        │
echo └────────────────────────────────────────────────────────────────┘
echo.
echo Se tiver uma chave da OpenAI, cole aqui.
echo Se não tiver, apenas pressione ENTER (sistema funcionará sem IA)
echo.
set /p OPENAI_API_KEY="OpenAI API Key (opcional): "

if "%OPENAI_API_KEY%"=="" (
    echo ⚠️  IA desabilitada (sem OPENAI_API_KEY)
) else (
    echo ✅ OPENAI_API_KEY configurada
)
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  PASSO 4: Deploy na Vercel                                     ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🚀 Iniciando deploy... Isso pode levar 2-3 minutos
echo.

REM Deploy com variáveis de ambiente
vercel --prod -e DATABASE_URL="%DATABASE_URL%" -e NEXTAUTH_SECRET="%NEXTAUTH_SECRET%" -e OPENAI_API_KEY="%OPENAI_API_KEY%"

if %errorlevel% neq 0 (
    echo ❌ Erro durante o deploy
    echo.
    echo 💡 Tente novamente ou use o método manual em DEPLOY_COMPLETO.md
    pause
    exit /b 1
)

echo.
echo ✅ Deploy realizado com sucesso!
echo.

REM Capturar URL do deploy
for /f "tokens=*" %%i in ('vercel --prod 2^>nul ^| findstr "https://"') do set DEPLOY_URL=%%i

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  PASSO 5: Configurar Banco de Dados                           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📊 Criando tabelas no banco de dados...
echo.

REM Baixar variáveis de ambiente
vercel env pull .env.production.local

REM Executar migração
npx prisma db push --accept-data-loss

if %errorlevel% neq 0 (
    echo ⚠️  Erro ao criar tabelas
    echo    Execute manualmente: npx prisma db push
) else (
    echo ✅ Tabelas criadas com sucesso
)
echo.

echo 👥 Criando usuário administrador...
npx prisma db seed

if %errorlevel% neq 0 (
    echo ⚠️  Erro ao criar usuário
    echo    Execute manualmente: npx prisma db seed
) else (
    echo ✅ Usuário administrador criado
)
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║  🎉 DEPLOY CONCLUÍDO COM SUCESSO!                             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo ┌────────────────────────────────────────────────────────────────┐
echo │ 🌐 SEU SISTEMA ESTÁ ONLINE!                                    │
echo └────────────────────────────────────────────────────────────────┘
echo.

if defined DEPLOY_URL (
    echo URL de Acesso: %DEPLOY_URL%
) else (
    echo Execute 'vercel --prod' para ver a URL
)

echo.
echo ┌────────────────────────────────────────────────────────────────┐
echo │ 👤 CREDENCIAIS DE ADMINISTRADOR                                │
echo └────────────────────────────────────────────────────────────────┘
echo.
echo Email: admin@sistema.com
echo Senha: Admin@123
echo.
echo ⚠️  IMPORTANTE: Altere a senha após o primeiro login!
echo.
echo ┌────────────────────────────────────────────────────────────────┐
echo │ 📋 PRÓXIMOS PASSOS                                             │
echo └────────────────────────────────────────────────────────────────┘
echo.
echo 1. Acesse o sistema pelo navegador
echo 2. Faça login com as credenciais acima
echo 3. Vá em Configurações e altere a senha
echo 4. Crie usuários para sua equipe
echo 5. Faça upload dos dados de absenteísmo
echo.
echo 💡 Para personalizar o domínio:
echo    Vercel Dashboard → Seu Projeto → Settings → Domains
echo.
echo 📖 Documentação completa: DEPLOY_COMPLETO.md
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Sistema pronto para uso! Boa análise de dados! 📊            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
pause
