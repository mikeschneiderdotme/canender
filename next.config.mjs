/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/health',
            destination: '/api/health',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
