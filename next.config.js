/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['framer-motion'],
  output: 'standalone',
  images: {
    domains: ['www.webdevian.ch'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.webdevian.ch',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
}

module.exports = nextConfig
