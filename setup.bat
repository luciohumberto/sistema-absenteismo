@echo off
chcp 65001 >nul
cls

echo ============================================================
echo 🚀 Configuração Inicial do Sistema de Análise de Absenteísmo
echo ============================================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado!
    echo Por favor, instale Node.js 18+ em: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=1 delims=v" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js detectado
echo.

REM Instalar dependências
echo 📦 Instalando dependências...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo ✅ Dependências instaladas com sucesso
echo.

REM Configurar arquivo .env
if not exist .env (
    echo 📝 Criando arquivo .env...
    copy .env.example .env >nul
    echo ✅ Arquivo .env criado
    echo.
    echo ⚠️  IMPORTANTE: Edite o arquivo .env e configure:
    echo    - DATABASE_URL ^(connection string do PostgreSQL^)
    echo    - NEXTAUTH_SECRET ^(gere com: openssl rand -base64 32^)
    echo    - NEXTAUTH_URL ^(http://localhost:3000 para desenvolvimento^)
    echo    - OPENAI_API_KEY ^(opcional, para funcionalidades de IA^)
    echo.
    echo Pressione qualquer tecla após configurar o .env...
    pause >nul
) else (
    echo ✅ Arquivo .env já existe
    echo.
)

REM Verificar se DATABASE_URL está configurada
findstr /C:"postgresql://user:password@host:5432/database" .env >nul
if %errorlevel% equ 0 (
    echo ⚠️  Atenção: DATABASE_URL ainda está com valor de exemplo
    echo Configure a connection string do PostgreSQL no arquivo .env
    echo.
    echo Opções gratuitas:
    echo   • Supabase: https://supabase.com
    echo   • Neon: https://neon.tech  
    echo   • Vercel Postgres: vercel postgres create
    echo.
    echo Pressione qualquer tecla após configurar DATABASE_URL...
    pause >nul
)

REM Configurar banco de dados
echo 🗄️  Configurando banco de dados...
echo.
echo Gerando cliente Prisma...
call npx prisma generate

echo.
echo Criando tabelas no banco de dados...
call npx prisma db push

if %errorlevel% neq 0 (
    echo ❌ Erro ao criar tabelas
    echo Verifique se a DATABASE_URL está correta
    pause
    exit /b 1
)

echo ✅ Banco de dados configurado
echo.

REM Popular com dados de exemplo
set /p populate="🌱 Deseja popular o banco com dados de exemplo? (S/N): "
if /i "%populate%"=="S" (
    echo Populando banco de dados...
    call npm run db:seed
    
    if %errorlevel% equ 0 (
        echo ✅ Dados de exemplo carregados
        echo.
        echo 📋 Credenciais de acesso:
        echo    Email: admin@sistema.com
        echo    Senha: admin123
    ) else (
        echo ⚠️  Aviso: Erro ao carregar dados de exemplo
    )
)

echo.
echo ✅ Configuração concluída com sucesso!
echo.
echo 🎉 Sistema pronto para uso!
echo.
echo Para iniciar o servidor de desenvolvimento:
echo   npm run dev
echo.
echo Depois acesse: http://localhost:3000
echo.
echo 📚 Documentação útil:
echo   • Manual do Usuário: docs\MANUAL_USUARIO.md
echo   • Guia de Deploy: docs\DEPLOY.md
echo   • Início Rápido: docs\INICIO_RAPIDO.md
echo.
echo 💡 Dica: Execute 'npm run db:studio' para visualizar o banco de dados
echo.
pause
