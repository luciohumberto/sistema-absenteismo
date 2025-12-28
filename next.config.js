/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '120mb',
    },
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
