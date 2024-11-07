/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['framer-motion'],
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['localhost', 'webdevian.ch', 'www.webdevian.ch'],
    loader: 'default',
    path: '',
  },
}

module.exports = nextConfig 
