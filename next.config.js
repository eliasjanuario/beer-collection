/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // NOTE: This code snippet was not entirely written by me.
    // It includes contributions of Documentations or sections authored by others.
    domains: ['images.punkapi.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.punkapi.com',
        port: '',
        pathname: '/v2/**',
      },
    ],
    // ---------------------------------------------------------------------------
  },
}

module.exports = nextConfig
