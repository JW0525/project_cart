/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.29cm.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/cart/components',
        destination: '/cart',
        permanent: true,
      },
      {
        source: '/products/components',
        destination: '/components',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
