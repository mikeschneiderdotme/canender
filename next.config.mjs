/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "lib/styles")],
  },
  output: "export",
  basPath: "/canender",
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
