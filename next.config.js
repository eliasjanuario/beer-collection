/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.punkapi.com', 'localhost'], // Adicione 'localhost' aos domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.punkapi.com',
        port: '',
        pathname: '/v2/**',
      },
    ],
  },
}

module.exports = nextConfig
