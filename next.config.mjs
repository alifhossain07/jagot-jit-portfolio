/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co', 'img.youtube.com'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jagotjitproductions.com',
          },
        ],
        destination: 'https://jagotjitproductions.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;