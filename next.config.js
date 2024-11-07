/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['framer-motion'],
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['localhost', 'ihre-domain.de'],
    loader: 'default',
    path: '',
  },
}

module.exports = nextConfig 
