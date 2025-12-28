#!/bin/bash

# Script de configuração inicial do Sistema de Análise de Absenteísmo
# Execute este script após clonar o repositório

echo "🚀 Configuração Inicial do Sistema de Análise de Absenteísmo"
echo "============================================================"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Por favor, instale Node.js 18+ em: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso"
echo ""

# Configurar arquivo .env
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado"
    echo ""
    echo "⚠️  IMPORTANTE: Edite o arquivo .env e configure:"
    echo "   - DATABASE_URL (connection string do PostgreSQL)"
    echo "   - NEXTAUTH_SECRET (gere com: openssl rand -base64 32)"
    echo "   - NEXTAUTH_URL (http://localhost:3000 para desenvolvimento)"
    echo "   - OPENAI_API_KEY (opcional, para funcionalidades de IA)"
    echo ""
    echo "Pressione ENTER após configurar o .env para continuar..."
    read
else
    echo "✅ Arquivo .env já existe"
    echo ""
fi

# Verificar se DATABASE_URL está configurada
if grep -q "postgresql://user:password@host:5432/database" .env; then
    echo "⚠️  Atenção: DATABASE_URL ainda está com valor de exemplo"
    echo "Configure a connection string do PostgreSQL no arquivo .env"
    echo ""
    echo "Opções gratuitas:"
    echo "  • Supabase: https://supabase.com"
    echo "  • Neon: https://neon.tech"
    echo "  • Vercel Postgres: vercel postgres create"
    echo ""
    echo "Pressione ENTER após configurar DATABASE_URL para continuar..."
    read
fi

# Configurar banco de dados
echo "🗄️  Configurando banco de dados..."
echo ""
echo "Gerando cliente Prisma..."
npx prisma generate

echo ""
echo "Criando tabelas no banco de dados..."
npx prisma db push

if [ $? -ne 0 ]; then
    echo "❌ Erro ao criar tabelas"
    echo "Verifique se a DATABASE_URL está correta"
    exit 1
fi

echo "✅ Banco de dados configurado"
echo ""

# Popular com dados de exemplo
echo "🌱 Deseja popular o banco com dados de exemplo? (s/n)"
read -r response
if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
    echo "Populando banco de dados..."
    npm run db:seed
    
    if [ $? -eq 0 ]; then
        echo "✅ Dados de exemplo carregados"
        echo ""
        echo "📋 Credenciais de acesso:"
        echo "   Email: admin@sistema.com"
        echo "   Senha: admin123"
    else
        echo "⚠️  Aviso: Erro ao carregar dados de exemplo"
    fi
fi

echo ""
echo "✅ Configuração concluída com sucesso!"
echo ""
echo "🎉 Sistema pronto para uso!"
echo ""
echo "Para iniciar o servidor de desenvolvimento:"
echo "  npm run dev"
echo ""
echo "Depois acesse: http://localhost:3000"
echo ""
echo "📚 Documentação útil:"
echo "  • Manual do Usuário: docs/MANUAL_USUARIO.md"
echo "  • Guia de Deploy: docs/DEPLOY.md"
echo "  • Início Rápido: docs/INICIO_RAPIDO.md"
echo ""
echo "💡 Dica: Execute 'npm run db:studio' para visualizar o banco de dados"
echo ""
