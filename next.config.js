/** @type {import('next').NextConfig} */
const nextConfig = {
  source: '/:path*{.js,.css,.png,.jpg,.svg,.webp}',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
}

module.exports = nextConfig
